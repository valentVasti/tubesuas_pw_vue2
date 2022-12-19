<template>
	<div>
		<!-- <v-navigation-drawer app v-model="drawer" width="16%" color="#ff8600" hide-overlay>
          <v-list-item>
              <v-list-item-content>
                  <v-img contain max-height="60"></v-img>
              </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list nav>
              <v-list-item class="my-5" v-for="menu in menus" :key="menu.title" link tag="router-link" :to="menu.to">
                  <v-list-item-icon>
                      <v-icon color="#ffff">{{ menu.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                      <v-list-item-title style="font-family: Poppins; color: #ffff; font-size: 110.5%; font-weight: 600;">{{ menu.title}}</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
          </v-list>
      </v-navigation-drawer> -->
		<div class="fluid">
			<v-app-bar app fixed height="65%" color="#219ebc">
				<!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
				<span class="navbartext">
					<!-- XXXX: NPM -->
					Nama Website
				</span>
				<v-spacer></v-spacer>
				<span class="navbartext">
					<!-- XXXX: NPM -->
					Login Page
				</span>
			</v-app-bar>

			<v-card class="cardLogin" max-width="400" elevation="5" rounded>
				<v-card-title class="logincardtitle">LOGIN</v-card-title>
				<v-card-subtitle>Let's get started!</v-card-subtitle>

				<v-form ref="form" @submit.prevent="submit">
					<v-container fluid>
						<v-row>

							<v-text-field v-model="name" label="Name" :rules="empty" required filled rounded
								dense></v-text-field>
							<v-text-field v-model="password" label="Password" :rules="empty" required filled rounded
								dense></v-text-field>
						</v-row>
					</v-container>
					<v-spacer></v-spacer>
					<v-btn color="#219ebc" rounded large block type="submit" @click="store()">
						Sign In
					</v-btn>

					<p></p>
					<hr class="mx-auto" width="350px" />
					<p></p>
					<v-btn color="secondary" text rounded large block to="/register">
						<span class="dontBtn">Don't Have Account?</span>
					</v-btn>
				</v-form>
			</v-card>
		</div>
	</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@500&display=swap');

.navbartext {
	font-family: Poppins;
	font-style: bold;
	color: rgb(255, 255, 255);
	font-size: 20px;
}

.textfield {
	font-family: Poppins !important;
	color: black;
}

.cardLogin {
	margin-top: 150px;
	margin-left: auto;
	margin-bottom: auto;
	margin-right: auto;
	padding: 1%;

}

.logincardtitle {
	font-weight: 700;
	font-size: xx-large;
	font-family: Poppins !important;
}

.loginBtn {
	font-family: Poppins !important;
	font-style: bold;
	color: rgb(255, 255, 255);
	font-size: large;
}

.dontBtn {
	font-family: Poppins !important;
	font-style: bold;
	color: rgb(59, 59, 59);
	font-size: large;
}
</style>

<script>
// import { ref, reactive } from 'vue'
// import { useRoute } from 'vue-router'
// import axios from 'axios'

export default {
	setup() {
		//state departemen
		// const login = reactive({
		// 	username: '',
		// 	password: '',
		// })

		// //state validation
		// const validation = ref([])

		// //method store
		// function login() {
		// 	let username = user.username
		// 	let password = user.password

		// 	axios.post('http://127.0.0.1:8000/api/users/login', {
		// 		username: username,
		// 		password: password,
		// 	}).then(() => {
		// 		//redirect ke post index
		// 		this.$router.push({
		// 			name: 'loginPage'
		// 		})
		// 	}).catch(error => {
		// 		//assign state validation with error
		// 		this.validation.value = error.response.data
		// 		console.log(error);
		// 		console.log("ERROR:: ", error.response.data)
		// 	})
		// }

		//return
		return {
			empty: [val => (val || '').length > 0 || 'This field is required'],
			// user,
			// validation,
			// store
		}
	},
}
</script>