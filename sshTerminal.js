

/// LABELING_SECTION_START
// file://
/// LABELING_SECTION_END


/// SETTING_SECTION_START
editExecute="ALWAYS"
onAutoExec="ON"
onAdBlock="OFF"
onTermBackendWhenStart="OFF"
onTermVisibleWhenKeyboard="ON"
onTermShortWhenLoad="ON"
onUrlHistoryRegister="OFF"
defaultMonitorFile="term_4"
// disableEditButton="ON"
// disablePlayButton="ON"
terminalFontZoom="100"
setReplaceVariables="file://"
setVariableTypes="file://"
hideSettingVariables="file://"
scriptFileName="sshTerminal.js"
/// SETTING_SECTION_END


/// CMD_VARIABLE_SECTION_START
sendkeys1=""
sendkeys2=""
sendkeys3=""
cmdInput=""
REGISTER_EXTRA_KEY=""
userName=""
address=""
port=""
sshPass=""
keyPhase="NO"
/// CMD_VARIABLE_SECTION_END


let args = jsArgs.get().split("\t");
var FIRST_ARGS = args.at(0);


switch(FIRST_ARGS){
  case "${CTRL_C}":
    jsSendKey.send("${CTRL_C}");
    break;
  case "${CTRL_Z}": 
    jsSendKey.send("${CTRL_Z}");
    break;
  case "${UP}": 
    jsSendKey.send("${UP}");
    break;
  case "${DOWN}": 
    jsSendKey.send("${DOWN}");
    break;
  case "${LEFT}": 
    jsSendKey.send("${LEFT}");
    break;
  case "${RIGHT}": 
    jsSendKey.send("${RIGHT}");
    break;
  case "${INPUT}": 
    termInput();
    break;
  case "${PAGE_DOWN}": 
    jsSendKey.send("${PAGE_DOWN}");
    break;
  case "${PAGE_UP}": 
    jsSendKey.send("${PAGE_UP}");
    break;
  case "${ESC}": 
    jsSendKey.send("${ESC}");
    break;
  case "${HOME}": 
    jsSendKey.send("${HOME}");
    break;
  case "${END}": 
    jsSendKey.send("${END}");
    break;
  case "${ENTER}": 
    jsSendKey.send("${ENTER}");
    break;
  case "${BACKSPACE}": 
    jsSendKey.send("${BACKSPACE}");
    break;
  case "${COPY}": 
    execCopy();
    // jsSendKey.send("${COPY}");
    break;
  case "${PASTE}": 
    jsSendKey.send("${PASTE}");
    break;
  case "${SPACE}": 
    jsSendKey.send("${SPACE}");
    break;
  case "${CMD_INPUT}":
    updateSeachWordList(
      cmdInput,
      "${CMD_INPUT}",
      "${sshTerminalListDirPath}",
      "${sshTerminalCmdListFilePath}",
    );
  case "${REGISTER_EXTRA_KEY}":
    updateSeachWordList(
      REGISTER_EXTRA_KEY,
      "${REGISTER_EXTRA_KEY}",
      "${sshTerminalListDirPath}",
      "${sshTerminalExtraKeyListFilePath}",
    );
    break;
};


function updateSeachWordList(
  registerWord,
  targetArgs,
  listDirPath,
  listFilePath,
){
  if(
    FIRST_ARGS != targetArgs
  ) return;
  if(
    !registerWord
  ) {
    jsToast.short("Must not be blank");
    return;
  };
  jsFileSystem.createDir(
    listDirPath
  );
  jsListSelect.updateListFileCon(
    listFilePath,
    registerWord
  );
  jsToast.short(
    `Register ok:\n ${registerWord}`
  );
};


function execCopy() {
  const fileDirPath = jsPath.echoPath("appFiles");
  const scriptLogPath = `${fileDirPath}/1/rootfs/home/cmdclick/script.log`;
  const scriptLogCon = jsFileSystem.readLocalFile(
    scriptLogPath
  ).replaceAll(
      "\n",
      "<br>"
  ).replaceAll(
      /[\u001b\u009b][\[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      ""
  ).replaceAll(
      /[\x00-\x1F\x7F-\xA0]+/g,
      ""
  ).replaceAll(
      /(cmdclick@localhost)/g,
      "<br><font color=\"#30992e\"><b>$1</b></font>"
  ).replaceAll(
    /\]0\;\n*/g, ""
  ).replaceAll(
    /\n\n*/g, "\n"
  ).replaceAll(
      "\n",
      "<br>"
  ).replaceAll(
    /\<font color\=\"\#30992e\"\>\<b\>cmdclick@localhost\<\/b\>\<\/font\>: \~\<br\>/g,
    "",
  ).replaceAll(
    /\<font color\=\"\#30992e\"\>\<b\>cmdclick@localhost\<\/b\>\<\/font\>\:\~\$ \<br\>/g,
    "",
  ).replaceAll(
    /\<br\>\<br\>*/g,
    "\<br\>",
  );
  jsDialog.copyDialog(
        "Select text",
        scriptLogCon,
        true
    );
};


function termInput(){
  const inputStr = jsDialog.prompt(
    "",
    "",
    "variableName=termInput|concatFilePathList=${sshTerminalCmdListFilePath}",
  );
  if(!inputStr) exitZero();
  jsSendKey.send(inputStr);
};
