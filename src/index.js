import { emitChange, insertPage, removePage } from './context';

Component({
  properties: {
    title: {
      type: String,
      value: null,
      observer() {
        emitChange(this, ['title']);
      },
    },
    navigationBar: {
      type: String,
      value: null,
      observer() {
        emitChange(this, ['navigationBar']);
      },
    },
    background: {
      type: String,
      value: null,
      observer() {
        emitChange(this, ['background']);
      },
    },
    shareContent: {
      type: Object,
      value: null,
    },
  },

  lifetimes: {
    attached() {
      insertPage(this);
    },
    ready() {
      this.didReady = true;
      emitChange(this);
    },
    detached() {
      removePage(this);
      emitChange(this);
    },
  },
});
