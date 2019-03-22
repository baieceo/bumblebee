import { CodeMirror } from 'vue-codemirror'

// Applies automatic formatting to the specified range
CodeMirror.defineExtension('autoFormatRange', function(from, to) {
  const cm = this
  const outer = cm.getMode()
  const text = cm.getRange(from, to).split('\n')
  const state = CodeMirror.copyState(outer, cm.getTokenAt(from).state)
  const tabSize = cm.getOption('tabSize')

  let out = ''
  let lines = 0
  let atSol = from.ch === 0

  function newline() {
    out += '\n'
    atSol = true
    ++lines
  }

  for (let i = 0; i < text.length; ++i) {
    const stream = new CodeMirror.StringStream(text[i], tabSize)

    while (!stream.eol()) {
      const inner = CodeMirror.innerMode(outer, state)
      const style = outer.token(stream, state)
      const cur = stream.current()

      stream.start = stream.pos

      if (!atSol || /\S/.test(cur)) {
        out += cur
        atSol = false
      }

      if (
        !atSol &&
        inner.mode.newlineAfterToken &&
        inner.mode.newlineAfterToken(
          style,
          cur,
          stream.string.slice(stream.pos) || text[i + 1] || '',
          inner.state
        )
      )
        newline()
    }
    if (!stream.pos && outer.blankLine) outer.blankLine(state)
    if (!atSol) newline()
  }

  cm.operation(function() {
    cm.replaceRange(out, from, to)

    for (let cur = from.line + 1, end = from.line + lines; cur <= end; ++cur)
      cm.indentLine(cur, 'smart')

    cm.setSelection(from, cm.getCursor(false))
  })
})
