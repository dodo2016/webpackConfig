import layer from './components/layer/layer.js';

import './css/common.css';

const App=function () {
    var dom=document.getElementById('app');
   //var layer=layer().tpl;
   console.log(layer().tpl);
   console.log(layer().name);
   dom.innerHTML=layer().tpl({
     name:'jhon',
     arr:['apple','banner']
   });
}
new App();
