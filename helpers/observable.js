class Observable {
  observers = [];
  
  subscribe(fn) {
    const observer = new Observer(this);
    this.observers.push({ observer, fn });
    return observer;
  }

  next(value) {
    this.observers.forEach(({ observer, fn }) => {
      fn(value);
    });
  }

  unsubscribe(id) {
    this.observers = this.observers.filter(({ observer }) => observer.id !== id);
  }
}

class Observer {
  id = Math.ceil(Math.random() * 1000000);
  observable;

  constructor(observable) {
    this.observable = observable;
  }

  unsubscribe() {
    this.observable.unsubscribe(this.id);
  }
}

export { Observable, Observer };