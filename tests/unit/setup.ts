import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

// == Fix warning: ==
//     [Vuetify] Missing v-app or a non-body wrapping element with the [data-app] attribute
//     found in
//     ---> <VSlider>
//            <Home>
//              <Root>
var app = document.createElement("div");
app.setAttribute("data-app", "true");
document.body.appendChild(app);
// == Fix warning end ==
