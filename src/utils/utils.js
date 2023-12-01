import { URL_PREFIX } from "../consts";

// 有些雀士的语音文件存在特殊情况，需要对音频文件进行替换
export const changeExceptionVoices = (
    audioUrls,
    janshi,
    originName,
    newName
) => {
    const indexRich = audioUrls.indexOf(
        `${URL_PREFIX}/${janshi}/${originName}.mp3`
    );
    if (indexRich >= 0)
        audioUrls[indexRich] = `${URL_PREFIX}/${janshi}/${newName}.mp3`;
};
