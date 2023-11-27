import React from 'react';
// import {createElement} from './utils.js';
import './styles.css';
import { FormattedMessage } from 'react-intl'
import { LOCALES } from '../src/i18n/locales'
import { messages } from '../src/i18n/messages.js'
import { IntlProvider } from 'react-intl'

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const locale = LOCALES.RUSSIAN

  return (
    <IntlProvider messages={messages[locale]} locale={locale} defaultLocale={LOCALES.RUSSIAN}>
      <div className='App'>
        <div className='App-head'>
          <h1>Приложение на чистом JS</h1>
        </div>
        <div className='App-controls'>
          <button onClick={() => store.addItem()}>Добавить</button>
        </div>
        <div className='App-center'>
          <div className='List'>{
            list.map(item =>
              <div key={item.code} className='List-item'>
                <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                    onClick={() => store.selectItem(item.code)}>
                  <div className='Item-code'>{item.code}</div>
                  <div className='Item-title'>{item.title} <span className={item.counter > 0 ? '' : 'none'}> <FormattedMessage id="click_count" values={{count: item.counter }} /></span></div>
                  <div className='Item-actions'>
                    <button onClick={(e) =>{e.stopPropagation(); store.deleteItem(item.code)}}>
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  </IntlProvider>
  );
}

export default App;
