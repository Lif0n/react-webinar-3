import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   * @param item
   */
  addItem(item) {
    //проверка есть ли предмет в корзине
    if(this.state.cart.find(cartItem => cartItem.code === item.code) === undefined){
      //добавление предмета в корзину и установка счетчика
      this.setState({
        ...this.state,
        cart: [...this.state.cart, {...item, count: 1}]
      })
    } else{
      //инкрементирование счетчика
      this.state.cart.find(cartItem => cartItem.code === item.code).count++;
      this.setState({
        ...this.state,
        cart: [...this.state.cart]
      });
    }
    console.log(this.state.cart);
  };


  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };
}

export default Store;
