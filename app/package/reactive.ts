type Event<T> = {
  on<key extends string & keyof T>(
    eventName: `${key}Update`,
    callback: (newVal: T[key], oldVal: T[key]) => void
  ): void;
};
interface Result<T> extends Event<T> {
  state: T;
}
export default function reactive<T>(data: T): Result<T> {
  const handlers = <Record<keyof T, Array<Function>>>{};
  /**
   * 方法1
   *  for (const key in data) {
    Object.defineProperty(state, key, {
      get() {
        return data[key];
      },
      set(newVal) {
        if (handlers[key]) {
          handlers[key].forEach((cb) => {
            cb(newVal, data[key]);
          });
        }
        data[key] = newVal;
      },
    });
  }
   */
  /**方法2 */
  const state = <T>new Proxy(data as object, {
    get(obj, prop) {
      return obj[prop];
    },
    set(obj, prop, newVal) {
      if (handlers[prop]) {
        handlers[prop].forEach((cb) => {
          cb(newVal, obj[prop]);
        });
      }
      obj[prop] = newVal;
      return true;
    },
  });
  /**
   * 收集事件更新
   * @param eventName 收集事件更新名称
   * @param callback 更新后执行回调
   */
  function on(eventName, callback) {
    const prop = eventName.replace("Update", "");
    if (!handlers[prop]) {
      handlers[prop] = [];
    }
    handlers[prop].push(callback);
  }
  return {
    state,
    on,
  };
}
