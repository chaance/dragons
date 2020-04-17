import React from 'react';
import { Select } from 'antd';
import $ from 'jquery';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/selectmenu.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/selectmenu';
import 'antd/dist/antd.css';
import './App.css';

// There's a bit of YOLO code in here
// if you came here for React best practices...maybe don't?

const Option = Select.Option;

const events = ['mousedown', 'mouseup', 'keydown', 'keyup'];

function App() {
  let [lastEvent, setLastEvent] = React.useState(null);

  React.useEffect(() => {
    $(function () {
      $('#jqui').selectmenu();
    });
  }, []);

  React.useEffect(() => {
    function listener(event) {
      if (event.type === 'keyup' || event.type === 'keydown') {
        let key = event.key === ' ' ? 'Spacebar' : event.key;
        setLastEvent(event.type + ', ' + key);
      } else {
        setLastEvent(event.type);
      }
    }

    events.forEach((ev) => {
      window.addEventListener(ev, listener, false);
    });

    return () => {
      events.forEach((ev) => {
        window.removeEventListener(ev, listener);
      });
    };
  }, []);

  return (
    <div className="App">
      <div className="App-wrapper">
        <main>
          <section>
            <h2>{'<select>'}</h2>
            <select className="native-select" defaultValue="choose" name="taco">
              <option value="choose">Choose a taco</option>
              <option value="carne">Carne Asada</option>
              <option value="pollo" disabled>
                Pollo
              </option>
              <option value="pastor">Pastor</option>
            </select>
          </section>
          <section>
            <h2>jQuery UI</h2>
            <select defaultValue="choose" name="taco" id="jqui">
              <option value="choose">Choose a taco</option>
              <option value="carne">Carne Asada</option>
              <option value="pollo" disabled>
                Pollo
              </option>
              <option value="pastor">Pastor</option>
            </select>
          </section>
          <section>
            <h2>Ant Design</h2>
            <Select defaultValue="choose" style={{ width: 180 }}>
              <Option value="choose">Choose a taco</Option>
              <Option value="carne">Carne Asada</Option>
              <Option value="pollo" disabled>
                Pollo
              </Option>
              <Option value="pastor">Pastor</Option>
            </Select>
          </section>
        </main>
        <aside>
          <div>
            <h2>Event Log</h2>
            <p>
              <strong>Last event:</strong> {lastEvent}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
