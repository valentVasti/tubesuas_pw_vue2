import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path){
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/loginPage",
            name: "loginPage",
            component: importComponent("LoginPage"),
            // children: [
            //     //Dashboard
            //     {
            //         path: "/",
            //         name: "Root",
            //         component: importComponent("DashboardIndex"),
            //     },

            //     //To Do List
            //     {
            //         path: "/gd",
            //         name: "Guided",
            //         component: importComponent("TodoList/ListItem"),
            //     },

            //     //UGD
            //     {
            //         path: "/ugd",
            //         name: "Activity Unguided",
            //         component: importComponent("TodoList/ToDoListUGD"),
            //     },

            //     //TGS
            //     {
            //         path: "/tgs",
            //         name: "Activity Tugas",
            //         component: importComponent("TodoList/TugasList"),
            //     },
            // ],
        },
        {
            path: "/register",
            name: "admin",
            component: importComponent("RegisterPage"),
        },
        {
            path: "/",
            name: "admin",
            component: importComponent("AppBarSideBar"),
            children: [
                {
                    path: "/hotelPage",
                    name: "hotelPage",
                    component: importComponent("HotelPage"),
                },
                {
                    path: "/kotaPage",
                    name: "kotaPage",
                    component: importComponent("KotaPage"),
                },
            ],
        }
    ],
});

export default router;