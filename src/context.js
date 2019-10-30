const store = {};

function getPageAttr(attrName, inst) {
  const pageId = inst.__wxWebviewId__;
  const componentList = store[pageId];

  if (!componentList) {
    return null;
  }

  for (let idx = componentList.length - 1; idx >= 0; idx--) {
    const component = componentList[idx];

    if (component.data[attrName] !== null) {
      return component.data[attrName];
    }
  }

  return null;
}

export function getPageShareContent(inst) {
  return getPageAttr('shareContent', inst);
}

export function emitChange(
  inst,
  attrs = ['title', 'navigationBar', 'background']
) {
  if (!inst.didReady) {
    return;
  }

  const pages = getCurrentPages();
  const topPage = pages[pages.length - 1];

  if (topPage.__wxWebviewId__ !== inst.__wxWebviewId__) {
    return;
  }

  if (attrs.indexOf('title') !== -1) {
    const title = getPageAttr('title', inst);

    if (title !== null) {
      wx.setNavigationBarTitle({ title });
    }
  }
  if (attrs.indexOf('navigationBar') !== -1) {
    const navigationBar = getPageAttr('navigationBar', inst);

    if (navigationBar !== null) {
      const [frontColor, backgroundColor] = navigationBar.split(' ');

      wx.setNavigationBarColor({ frontColor, backgroundColor });
    }
  }
  if (attrs.indexOf('background') !== -1) {
    const background = getPageAttr('background', inst);

    if (background !== null) {
      const [
        textStyle,
        backgroundColor,
        backgroundColorTop,
        backgroundColorBottom,
      ] = background.split(' ');

      if (textStyle) {
        wx.setBackgroundTextStyle({ textStyle });
      }
      if (backgroundColor || backgroundColorTop || backgroundColorBottom) {
        wx.setBackgroundColor({
          backgroundColor,
          backgroundColorTop,
          backgroundColorBottom,
        });
      }
    }
  }
}

export function insertPage(inst) {
  const pageId = inst.__wxWebviewId__;
  let componentList = store[pageId];

  if (!componentList) {
    store[pageId] = componentList = [];
  }

  componentList.push(inst);
}

export function removePage(inst) {
  const pageId = inst.__wxWebviewId__;
  const componentList = store[pageId];

  const idx = componentList.indexOf(inst);

  if (idx !== -1) {
    componentList.splice(idx, 1);

    if (componentList.length === 0) {
      store[pageId] = undefined;
      delete store[pageId];
    }
  }
}
