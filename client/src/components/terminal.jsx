import {Terminal as XTerminal} from "@xterm/xterm"
import { useEffect, useRef} from 'react'

const Terminal = () => {

  const terminalRef = useRef();


  useEffect(() => {
    const term = new XTerminal({
      rows: 20,
    });
    term.open(terminalRef.current)

    term.onData(data => {
      console.log(data)
    })
  }, [])

  return(
    <div id="terminal">

    </div>
  )
}

export default Terminal;