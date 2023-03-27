import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import DynamicDialog from 'primevue/dynamicdialog'
import OverlayPanel from 'primevue/overlaypanel';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
const app = createApp(App)


import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

app.component('p-button', Button)
app.component('InputNumber', InputNumber)
app.component('InputText', InputText)
app.component('Dropdown', Dropdown)
app.component('Card', Card)
app.component('DynamicDialog', DynamicDialog)
app.component('OverlayPanel', OverlayPanel)
app.component('Toast', Toast)

app.use(ToastService)
app.use(PrimeVue)
app.mount('#app')
