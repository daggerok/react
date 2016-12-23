import React from 'react';

const greyBg = { backgroundColor: 'lightgrey', };

export default (props) => (
  <div>

    <hr/>

    <table class="pure-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Make</th>
          <th>Model</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Honda</td>
          <td>Accord</td>
          <td>2009</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Toyota</td>
          <td>Camry</td>
          <td>2012</td>
        </tr>
      </tbody>
    </table>

    <pre style={greyBg}>{`
<table class="pure-table">
  <thead>
    <tr>
      <th>#</th>
      <th>Make</th>
      <th>Model</th>
      <th>Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Honda</td>
      <td>Accord</td>
      <td>2009</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Toyota</td>
      <td>Camry</td>
      <td>2012</td>
    </tr>
  </tbody>
</table>`}</pre>

    <hr/>

    <a class="pure-button" href="#">A link buttin</a>
    {' '}
    <button class="pure-button">A Pure Button</button>
    {' '}
    <button class="pure-button" disabled>A Disabled Button</button>
    {' '}
    <button class="pure-button pure-button-primary">A Primary Button</button>
    <pre style={greyBg}>{`
<a class="pure-button" href="#">A link buttin</a>
<button class="pure-button">A Pure Button</button>
<button class="pure-button" disabled>A Disabled Button</button>
<button class="pure-button pure-button-primary">A Primary Button</button>`}</pre>

    <hr/>

    <div class="pure-g">
      <div style={{backgroundColor: 'red'}} class="pure-u-1-2"><p>pure-u-1-2</p></div>
    </div>
    <div class="pure-g">
      <div style={{backgroundColor: 'green'}} class="pure-u-2-3"><p>pure-u-2-3</p></div>
    </div>
    <div class="pure-g">
      <div style={{backgroundColor: 'yellow'}} class="pure-u-3-24"><p>pure-u-3-24</p></div>
    </div>
    <pre style={greyBg}>{`
<div class="pure-g">
  <div style={{backgroundColor: 'red'}} class="pure-u-1-2"><p>pure-u-1-2</p></div>
</div>
<div class="pure-g">
  <div style={{backgroundColor: 'green'}} class="pure-u-2-3"><p>pure-u-2-3</p></div>
</div>
<div class="pure-g">
  <div style={{backgroundColor: 'yellow'}} class="pure-u-3-24"><p>pure-u-3-24</p></div>
</div>`}</pre>

    <hr/>

    <div class="pure-g">
      <div class="pure-u-1-3"><p>Thirds</p></div>
      <div class="pure-u-1-3"><p>Thirds</p></div>
      <div class="pure-u-1-3"><p>Thirds</p></div>
    </div>
    <pre style={greyBg}>{
`<div class="pure-g">
  <div class="pure-u-1-3"><p>Thirds</p></div>
  <div class="pure-u-1-3"><p>Thirds</p></div>
  <div class="pure-u-1-3"><p>Thirds</p></div>
</div>`
    }</pre>

  </div>
);
