import {nuomi} from 'nuomi';
console.log(nuomi);
nuomi.config({
	effects:{
    updateState(payload) {
      this.dispatch({
        type: '_updateState',
        payload,
      });
    }
	}
})