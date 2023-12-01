import React, { Component } from "react";
import {
    Layout,
    Space,
    Card,
    Form,
    Radio,
    Button,
    Row,
    Col,
    Checkbox,
    Select,
} from "antd";
import { changeExceptionVoices } from "./utils/utils";
import { URL_PREFIX } from "./consts";

const { Header, Footer, Content } = Layout;
const { Option } = Select;
const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 50,
    lineHeight: "64px",
    backgroundColor: "#7dbcea",
};
const contentStyle = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    margin: "0 auto",
};
const footerStyle = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#7dbcea",
};

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

let audioElements = [];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const playAudio = (index) => {
    if (index < audioElements.length) {
        // 按照定义的顺序播放音频
        audioElements[index].play();
        audioElements[index].addEventListener("ended", () => {
            // 当前音频播放结束后，播放下一个音频
            playAudio(index + 1);
        });
    } else {
        console.log("All audio elements have been played.");
    }
};
const preloadAudio = (url, index) => {
    const audio = new Audio(url);
    audio.addEventListener("canplaythrough", () => {
        console.log(`Audio ${index + 1} is ready.`);
        if (index === 0) {
            // 如果是第一个音频，开始播放
            playAudio(index);
        }
    });
    audioElements.push(audio);
};
const playAudios = (urls) => {
    urls.forEach(async (url, index) => {
        preloadAudio(url, index);
        await sleep(1500);
    });
};

const onFinish = (values) => {
    const audioUrls = [];
    audioElements = [];
    // 保证在首位
    if (values["agari"]) {
        audioUrls.push(`${URL_PREFIX}/${values.janshi}/${values["agari"]}.mp3`);
    }
    for (const [key, value] of Object.entries(values)) {
        if (
            key !== "janshi" &&
            key !== "agari" &&
            key !== "checkbox-group-dora" &&
            key !== "checkbox-group-result" &&
            value
        ) {
            value.forEach((item) => {
                audioUrls.push(`${URL_PREFIX}/${values.janshi}/${item}.mp3`);
            });
        }
    }
    // 保证在末位
    if (values["checkbox-group-dora"]) {
        audioUrls.push(
            `${URL_PREFIX}/${values.janshi}/${values["checkbox-group-dora"][0]}.mp3`
        );
    }
    if (values["checkbox-group-result"]) {
        audioUrls.push(
            `${URL_PREFIX}/${values.janshi}/${values["checkbox-group-result"]}.mp3`
        );
    }

    // 一姬的立直报番为fan_rich而不是一般的fan_liqi
    // 一姬的自摸报番为fan_tumo而不是一般的fan_zimo
    changeExceptionVoices(audioUrls, "yiji", "fan_liqi", "fan_rich");
    changeExceptionVoices(audioUrls, "yiji", "fan_zimo", "fan_tumo");

    playAudios(audioUrls);
};

export default class BasicLayout extends Component {
    render() {
        return (
            <Space
                direction="vertical"
                style={{ width: "100%" }}
                size={[0, 48]}
            >
                <Layout>
                    {/* <Header style={headerStyle}>Header</Header> */}
                    <Content style={contentStyle}>
                        <Card title="报番助手" style={{ width: "100%" }}>
                            <Form
                                name="validate_other"
                                {...formItemLayout}
                                onFinish={onFinish}
                                style={{
                                    maxWidth: 600,
                                }}
                            >
                                <Form.Item
                                    name="janshi"
                                    label="雀士"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: "雀士为必选",
                                        },
                                    ]}
                                >
                                    <Select placeholder="选择雀士">
                                        <Option value="yiji">一姬</Option>
                                        <Option value="huiyeji">辉夜姬</Option>
                                        <Option value="bamuwei">八木唯</Option>
                                        <Option value="jiutiao">
                                            九条璃雨
                                        </Option>
                                        <Option value="beijianshahezi">
                                            <Option value="ailisha">
                                                艾丽莎
                                            </Option>
                                            北见纱和子
                                        </Option>
                                        <Option value="fuji">福姬</Option>
                                        <Option value="akagi">赤木茂</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name="agari" label="和牌形式">
                                    <Radio.Group>
                                        <Radio.Button value="act_ron">
                                            荣和
                                        </Radio.Button>
                                        <Radio.Button value="act_tumo">
                                            自摸
                                        </Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    name="checkbox-group-1han"
                                    label="一番"
                                >
                                    <Checkbox.Group>
                                        <Row>
                                            <Col>
                                                <Checkbox
                                                    value="fan_liqi"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    立直
                                                </Checkbox>
                                            </Col>

                                            <Col>
                                                <Checkbox
                                                    value="fan_yifa"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    一发
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_zimo"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    自摸
                                                </Checkbox>
                                            </Col>

                                            <Col>
                                                <Checkbox
                                                    value="fan_qianggang"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    抢杠
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_lingshang"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    岭上开花
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_haidi"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    海底摸月
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_hedi"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    河底捞鱼
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_dong"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    东
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_nan"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    南
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_xi"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    西
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_bei"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    北
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_zhong"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    中
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_bai"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    白
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_fa"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    发
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_doubledong"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    连东
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_doublenan"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    连南
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_doublexi"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    连西
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_doublebei"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    连北
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_duanyao"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    断幺
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_yibeikou"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    一杯口
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_pinghu"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    平和
                                                </Checkbox>
                                            </Col>
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>
                                <Form.Item
                                    name="checkbox-group-2han"
                                    label="二番"
                                >
                                    <Checkbox.Group>
                                        <Row>
                                            <Col>
                                                <Checkbox
                                                    value="fan_dliqi"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    两立直
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_hunquandaiyaojiu"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    混全带幺九
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_yiqitongguan"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    一气通贯
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_sansetongshun"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    三色同顺
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_sansetongke"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    三色同刻
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_sangangzi"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    三杠子
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_duiduihu"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    对对和
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_sananke"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    三暗刻
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_xiaosanyuan"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    小三元
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_hunlaotou"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    混老头
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_qiduizi"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    七对子
                                                </Checkbox>
                                            </Col>
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>
                                <Form.Item
                                    name="checkbox-group-3han"
                                    label="三番"
                                >
                                    <Checkbox.Group>
                                        <Row>
                                            <Col>
                                                <Checkbox
                                                    value="fan_hunyise"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    混一色
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_erbeikou"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    二杯口
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_chunquandaiyaojiu"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    纯全带幺九
                                                </Checkbox>
                                            </Col>
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>
                                <Form.Item
                                    name="checkbox-group-dora"
                                    label="宝牌"
                                >
                                    <Checkbox.Group>
                                        <Row>
                                            <Col>
                                                <Checkbox
                                                    value="fan_dora1"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    宝牌
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_dora2"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    宝牌2
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_dora3"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    宝牌3
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_dora4"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    宝牌4
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_dora5"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    宝牌5
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_dora6"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    宝牌6
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_dora7"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    宝牌7
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_dora8"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    宝牌8
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_dora9"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    宝牌9
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_dora10"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    宝牌10
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_dora11"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    宝牌11
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_dora12"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    宝牌12
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_dora13"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    宝牌一大堆
                                                </Checkbox>
                                            </Col>
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>
                                <Form.Item
                                    name="checkbox-group-6han"
                                    label="六番"
                                >
                                    <Checkbox.Group>
                                        <Row>
                                            <Col>
                                                <Checkbox
                                                    value="fan_qingyise"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    清一色
                                                </Checkbox>
                                            </Col>
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>
                                <Form.Item
                                    name="checkbox-group-mangan"
                                    label="满贯"
                                >
                                    <Checkbox.Group>
                                        <Row>
                                            <Col>
                                                <Checkbox
                                                    value="fan_liujumanguan"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    流局满贯
                                                </Checkbox>
                                            </Col>
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>
                                <Form.Item
                                    name="checkbox-group-yakuman"
                                    label="役满"
                                >
                                    <Checkbox.Group>
                                        <Row>
                                            <Col>
                                                <Checkbox
                                                    value="fan_tianhu"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    天和
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_dihu"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    地和
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_dasanyuan"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    大三元
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_sianke"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    四暗刻
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_siankedanqi"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    四暗刻单骑
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_ziyise"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    字一色
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_lvyise"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    绿一色
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_qinglaotou"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    清老头
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_guoshiwushuang"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    国士无双
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_guoshishisanmian"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    国士无双13面听
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_dasixi"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    大四喜
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_xiaosixi"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    小四喜
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_sigangzi"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    四杠子
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_jiulianbaodeng"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    九莲宝灯
                                                </Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    value="fan_chunzhengjiulianbaodeng"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    纯正九莲宝灯
                                                </Checkbox>
                                            </Col>

                                            <Col>
                                                <Checkbox
                                                    value="gameend_leijiyiman"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    累计役满
                                                </Checkbox>
                                            </Col>
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>

                                <Form.Item
                                    name="checkbox-group-result"
                                    label="终局结算"
                                >
                                    <Radio.Group>
                                        <Radio.Button value="gameend_manguan">
                                            满贯
                                        </Radio.Button>
                                        <Radio.Button value="gameend_tiaoman">
                                            跳满
                                        </Radio.Button>
                                        <Radio.Button value="gameend_beiman">
                                            倍满
                                        </Radio.Button>
                                        <Radio.Button value="gameend_sanbeiman">
                                            三倍满
                                        </Radio.Button>
                                        <Radio.Button value="gameend_yiman1">
                                            役满
                                        </Radio.Button>
                                        <Radio.Button value="gameend_yiman2">
                                            两倍役满
                                        </Radio.Button>
                                        <Radio.Button value="gameend_yiman3">
                                            三倍役满
                                        </Radio.Button>
                                        <Radio.Button value="gameend_yiman4">
                                            四倍役满
                                        </Radio.Button>
                                        <Radio.Button value="gameend_yiman5">
                                            五倍役满
                                        </Radio.Button>
                                        <Radio.Button value="gameend_yiman6">
                                            六倍役满
                                        </Radio.Button>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item
                                    name="checkbox-group-nagare"
                                    label="流局"
                                >
                                    <Radio.Group>
                                        <Radio.Button value="gameend_tingpai">
                                            听牌
                                        </Radio.Button>
                                        <Radio.Button value="gameend_noting">
                                            未听牌
                                        </Radio.Button>
                                        <Radio.Button value="gameend_jiuzhongjiupai">
                                            九种九牌
                                        </Radio.Button>
                                        <Radio.Button value="gameend_sifenglianda">
                                            四风连打
                                        </Radio.Button>
                                        <Radio.Button value="gameend_sigangliuju">
                                            四杠流局
                                        </Radio.Button>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        span: 12,
                                        offset: 6,
                                    }}
                                >
                                    <Space>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            报番
                                        </Button>
                                        <Button htmlType="reset">重置</Button>
                                    </Space>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Content>
                    {/* <Footer style={footerStyle}>Footer</Footer> */}
                </Layout>
            </Space>
        );
    }
}
