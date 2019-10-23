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
  }
};
