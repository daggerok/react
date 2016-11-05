'use strict';var Hi=function Hi(_ref){var name=_ref.name;return React.createElement('div',null,'hi, ',name?name:'guest')};
'use strict';var base=document.createElement('base');var heads=document.getElementsByTagName('head');base.setAttribute('href','/');heads[0].append(base);
'use strict';/**
 * @license
 * Copyright daggerok. All rights reserved.
 *
 * Use of this source code is governed by a ISC-style license
 * that can be found in the LICENSE file. at https://github.com/daggerok/angular2/LICENSE
 *//* eslint no-unused-vars: "off" */ReactDOM.render(React.createElement(Hi,{name:'Max'}),document.getElementById('app'));
