import React from "react";
import { nuomi, router, store } from "nuomi";
import immutable from "redux-immutable-state-invariant";
import { wanke, Icon, message } from "wanke-gui";
import utils from "./utils";
if (process.env.NODE_ENV !== "production") {
  store.applyMiddleware(immutable());
}

// 配置nuomi组件的配置
nuomi.config({
  state: {},
  effects: {
    updateState(payload) {
      this.dispatch({
        type: "_updateState",
        payload
      });
    },
    updateQuery(payload) {
      const { query } = this.getState();
      this.updateState({
        query: { ...query, ...payload }
      });
    },
    pageChange({ page, size }) {
      this.updateQuery({
        page,
        size
      });
      this.$getList();
    },
    beforeSaveForm(form) {
      return new Promise((resolve, reject) => {
        form.validateFields((errors, values) => {
          if (!errors) {
            resolve(values);
          } else {
            reject();
          }
        });
      });
    },

    link({ active: newactive, data, type, title }) {
      this.dispatch({
        type: "updateState",
        payload: {
          active: newactive
        }
      });
      if (data) {
        this.dispatch({
          type: "updateState",
          payload: {
            data: data
          }
        });
      }
      // 后退
      if (type === "back") {
        this.dispatch({
          type: "global/updateCrumbs",
          payload: {
            type: "back"
          }
        });
      }
      // 前进
      else if (type === "jump") {
      } else {
        this.dispatch({
          type: "global/updateCrumbs",
          payload: {
            type: "add",
            crumbs: {
              title: title,
              value: newactive
            }
          }
        });
      }
    }
  },
  onInit() {},
  onChange: {
    changeCrumbs() {
      const { url } = router.location();
      const { active } = this.store.getState();
      // 属于侧边栏的菜单按钮
      this.store.dispatch({
        type: "global/updateState",
        payload: {
          storeId: this.store.id,
          crumbs: [
            {
              title: utils.enumeration("router")[url],
              value: active
            }
          ]
        }
      });
    }
  }
});

// wanke 组件公共配置
wanke.config("table", {
  bordered: true,
  pagination: {
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: ["20", "30", "50", "100"],
    showTotal: total => `共 ${total} 条`
  }
});

wanke.config("download", {
  Button: (
    <a>
      <i
        className="iconfont"
        style={{
          fontSize: "36px",
          display: "inline-block",
          width: "36px",
          height: "36px",
          overflow: "hidden",
          lineHeight: 1,
          background: "#fff",
          borderRadius: "100%"
        }}
        title="导出"
      >
        &#xe659;
      </i>
    </a>
  )
});
wanke.config("modal", {
  // cancelButtonProps: {className: 'footer-cancel',},
  okButtonProps: { className: "e-ml15" },
  destroyOnClose: true,
  maskClosable: false,
  headerHeight: 55,
  footerHeight: 63,
  centered: true,
  fullScreenIcon: <Icon type="fullscreen" style={{ color: "#fff" }} />,
  fullScreenExistIcon: <Icon type="fullscreen-exit" style={{ color: "#fff" }} />
});

// 获取默认语言
// 国际化语言配置
// 皮肤的配置信息
let languageMessages = {};
const ENV = process.env.NODE_ENV;

const promise = new Promise((resolve, reject) => {
  // const theme = localStorage.getItem("theme") || "mint-green";
  const theme = "mint-green";
  if (ENV !== "production" && ENV !== "test") {
    import(/*webpackChunkName: "version" */ "./version");
  }
  import(/*webpackChunkName: "theme" */ "../style/theme/" + theme);
  import(
    /*webpackChunkName: "language" */ "../locale/" +
      utils.getInitLanguage() +
      ".json"
  ).then(res => {
    languageMessages = res;
    utils.intl = id => {
      if (languageMessages[id]) {
        return languageMessages[id];
      }
      return id;
    };
    resolve();
  });
});

message.config({
  maxCount: 1
});

const { error } = console;
if (process.env.process !== "production") {
  console.error = function(...args) {
    const [message] = args;
    // Unexpected key "nuomi_9" found in previous state received by the reducer. Expected to find one of the known reducer keys instead: "global", "priceUser", "nuomi_10". Unexpected keys will be ignored.
    if (
      message &&
      message.indexOf &&
      message.indexOf(
        'Expected to find one of the known reducer keys instead: "global"'
      ) === -1
    ) {
      error(...args);
    }
  };
}

export { promise };
