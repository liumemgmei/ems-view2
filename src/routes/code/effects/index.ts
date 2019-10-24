import utils from "../../../public/js/utils";

export default {
  generateCode({ type }) {
    const { forms } = this.getState();
    const data = [];
    for (const key in forms) {
      if (forms.hasOwnProperty(key)) {
        const form = forms[key];
        if (form) {
          data.push(form.getFieldsValue());
        }
      }
    }
    console.log("data", data);
    this.updateState({
      dataModel: data,
      type
    });
  },
  updateFormCom(payload) {
    const { forms } = this.getState();
    this.updateState({
      forms: { ...forms, ...payload }
    });
  },
  addApi() {
    const { data } = this.getState();
    this.updateState({
      data: [...data, { id: new Date().getTime(), req: "" }]
    });
  },
  deleteApi({ index }) {
    const { data } = this.getState();
    const newData = utils.delFromArrByIndex(data, index);
    this.updateState({
      data: newData
    });
  },
  addPageSize({ form }) {
    const req = form.getFieldValue("req");
    if (utils.typeOf(req, "Array")) {
      form.setFieldsValue({
        req: [
          ...req,
          { field: "page", type: "number", desc: "页数" },
          { field: "size", type: "number", desc: "每页条数" }
        ]
      });
    } else {
      form.setFieldsValue({
        req: [
          { id: "page", field: "page", type: "number", desc: "页数" },
          { id: "size", field: "size", type: "number", desc: "每页条数" }
        ]
      });
    }
  }
};
