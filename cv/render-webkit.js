// Fallback CV renderer for macOS when no headless Chromium works.
//
//   python3 cv/build_cv.py
//   for l in en es pt; do osascript -l JavaScript cv/render-webkit.js "$l"; done
//
// Prints cv/src/cv-<lang>.html to cv/Andres-del-Toro-Cruz-CV-<LANG>.pdf with
// WebKit (Safari's engine), keeps the single A4 page and sets PDF metadata.
// Zero dependencies: JavaScript for Automation + AppKit/WebKit/PDFKit.
ObjC.import('AppKit');
ObjC.import('WebKit');
ObjC.import('PDFKit');

function run(argv) {
  const lang = (argv[0] || 'en').toLowerCase();
  const cvDir = $.NSString.stringWithString($(ObjC.unwrap($.NSFileManager.defaultManager.currentDirectoryPath)))
    .stringByAppendingPathComponent('cv').js;
  const finalPath = `${cvDir}/Andres-del-Toro-Cruz-CV-${lang.toUpperCase()}.pdf`;
  const tmpPath = `${ObjC.unwrap($.NSTemporaryDirectory())}cv-${lang}-${Date.now()}.pdf`;
  const input = $.NSURL.fileURLWithPath(`${cvDir}/src/cv-${lang}.html`);
  const output = $.NSURL.fileURLWithPath(tmpPath);
  const access = $.NSURL.fileURLWithPath(cvDir).URLByDeletingLastPathComponent; // repo root (images/)

  $.NSApplication.sharedApplication;
  const frame = $.NSMakeRect(0, 0, 794, 1123);
  const web = $.WKWebView.alloc.initWithFrameConfiguration(frame, $.WKWebViewConfiguration.alloc.init);
  const win = $.NSWindow.alloc.initWithContentRectStyleMaskBackingDefer(frame, 0, 2, false);
  win.contentView = web;

  web.loadFileURLAllowingReadAccessToURL(input, access);
  const spin = (seconds) => $.NSRunLoop.currentRunLoop.runUntilDate($.NSDate.dateWithTimeIntervalSinceNow(seconds));

  let waited = 0;
  spin(0.3);
  while (web.isLoading && waited < 30) { spin(0.2); waited += 0.2; }
  if (web.isLoading) throw new Error('page did not finish loading');
  spin(1.0); // fonts and images settle

  const info = $.NSPrintInfo.alloc.init;
  info.paperSize = $.NSMakeSize(595.28, 841.89);
  info.topMargin = 0; info.bottomMargin = 0; info.leftMargin = 0; info.rightMargin = 0;
  info.horizontalPagination = 1; // fit width
  info.verticalPagination = 2;   // clip: one A4 page
  info.verticallyCentered = false;
  info.horizontallyCentered = false;
  info.jobDisposition = $.NSPrintSaveJob;
  info.dictionary.setObjectForKey(output, $.NSPrintJobSavingURL);

  const op = web.printOperationWithPrintInfo(info);
  op.showsPrintPanel = false;
  op.showsProgressPanel = false;
  op.view.frame = frame;

  let finished = false;
  ObjC.registerSubclass({
    name: 'PdfDoneHandler',
    methods: {
      'printOperationDidRun:success:contextInfo:': {
        types: ['void', ['id', 'bool', 'void *']],
        implementation: function () { finished = true; },
      },
    },
  });
  const handler = $.PdfDoneHandler.alloc.init;
  op.runOperationModalForWindowDelegateDidRunSelectorContextInfo(win, handler, 'printOperationDidRun:success:contextInfo:', null);
  waited = 0;
  while (!finished && waited < 30) { spin(0.2); waited += 0.2; }
  if (!finished) throw new Error('print timed out');

  // WebKit adds an empty overflow page; keep page 1 and set metadata.
  const doc = $.PDFDocument.alloc.initWithURL(output);
  while (doc.pageCount > 1) doc.removePageAtIndex(doc.pageCount - 1);
  const attrs = $.NSMutableDictionary.dictionary;
  attrs.setObjectForKey($('Andrés del Toro Cruz — CV'), $.PDFDocumentTitleAttribute);
  attrs.setObjectForKey($('Andrés del Toro Cruz'), $.PDFDocumentAuthorAttribute);
  doc.documentAttributes = attrs;
  if (!doc.writeToFile(finalPath)) throw new Error('could not write ' + finalPath);
  $.NSFileManager.defaultManager.removeItemAtPathError(tmpPath, null);
  return 'rendered ' + finalPath.split('/').pop();
}
