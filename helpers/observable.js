class Observable {
  observers = [];
  
  subscribe(observer) {
    this.observers.push(observer);
  }

  next(value) {
    this.observers.forEach((observer) => {
      observer.getMessage(value);
    })
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs.id != observer.id);
  }
}

class Observer {
  id = Math.ceil(Math.random() * 1000000);
  values = [];
  
  getMessage(value) {
    this.values.push(value);
    // console.log("received value: ", value);
  }
}

export { Observable, Observer };