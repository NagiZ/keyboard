export const commonKeyboardOptions = {
  theme: "simple-keyboard hg-theme-default hg-layout-default",
}
export const configMain = {
  layout: {
    default: [
      "{escape} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}",
      "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{capslock} a s d f g h j k l ; ' {enter}",
      "{lshift} z x c v b n m , . / {rshift}",
      "{lctrl} {lalt} {lcmd} {space} {rcmd} {ralt} {rctrl}"
    ],
    shift: [
      "{escape} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}",
      "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
      "{tab} Q W E R T Y U I O P { } |",
      '{capslock} A S D F G H J K L : " {enter}',
      "{lshift} Z X C V B N M < > ? {rshift}",
      "{lctrl} {lalt} {lcmd} {space} {rcmd} {ralt} {rctrl}"
    ]
  },
  display: {
    '`': '`~',
    '1': '1/!',
    '2': '2@',
    '3': '3#',
    '4': '4$',
    '5': '5%',
    '6': '6^',
    '7': '7&',
    '8': '8*',
    '9': '9(',
    '0': '0)',
    '-': '_-',
    '+': '=+',
    '{f1}': 'F1',
    '{f2}': 'F2',
    '{f3}': 'F3',
    '{f4}': 'F4',
    '{f5}': 'F5',
    '{f6}': 'F6',
    '{f7}': 'F7',
    '{f8}': 'F8',
    '{f9}': 'F9',
    '{f10}': 'F10',
    '{f11}': 'F11',
    '{f12}': 'F12',
    '{escape}': 'Esc',
    '{tab}': 'Tab',
    '{backspace}': 'Backspace',
    '{enter}': 'Enter ↵',
    '{capslock}': 'CapsLock',
    '{lshift}': 'Shift',
    '{rshift}': 'Shift',
    '{lctrl}': 'Ctrl',
    '{rctrl}': 'Ctrl',
    '{lalt}': 'Alt',
    '{ralt}': 'Alt',
    '{lcmd}': 'Cmd',
    '{rcmd}': 'Cmd',
    '{space}': 'Space',
  }
}

export const configCtrl = {
  layout: {
    default: [
      "{printscreen} {scrolllock} {pause}",
      "{insert} {home} {pageup}",
      "{delete} {end} {pagedown}"
    ]
  },
  display: {
    '{printscreen}': 'Print',
    '{pause}': 'Pause',
    '{delete}': 'Del',
    '{insert}': 'Ins',
    '{home}': 'Home',
    '{pagedown}': 'PgDn',
    '{pageup}': 'PgUp',
    '{end}': 'End',
    '{scrolllock}': 'ScrLk'
  }
}

export const configArrow = {
  layout: {
    default: ["{up}", "{left} {down} {right}"]
  },
  display: {
    '{up}': '↑',
    '{down}': '↓',
    '{left}': '←',
    '{right}': '→'
  }
}


export const layoutToKey = {
  '{arrowup}': 'up',
  '{arrowleft}': 'left',
  '{arrowdown}': 'down',
  '{arrowright}':'right',
  '{prtscr}': 'printscreen',
}

export type LayoutKey = typeof layoutToKey

export const getLayoutKey = (btn: string) => {
  return layoutToKey[btn as keyof LayoutKey]
}

export enum EventEnum {
  Up = 'keyup',
  Down = 'keydown'
}