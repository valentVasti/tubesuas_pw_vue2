<template>
	<div>
		<div class="fluid">
			<v-app-bar app fixed height="65%" color="#219ebc">
				<!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
				<span class="navbartext">
					<!-- XXXX: NPM -->
					mlakumlaku.com				
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

							<v-text-field v-model="loginInput.email" label="Email" :rules="empty" required filled rounded
								dense></v-text-field>
							<v-text-field v-model="loginInput.password" label="Password" :rules="empty" required filled rounded
								dense></v-text-field>
						</v-row>
					</v-container>
					<v-spacer></v-spacer>
					<v-btn color="#219ebc" rounded large block type="submit" @click="login()">
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
import { ref, reactive } from 'vue'
// import { useRoute } from 'vue-router'
import axios from 'axios'

export default {
	setup() {
		const loginInput = reactive({
			email: '',
			password: '',
		})

		//state validation
		const validation = ref([])

		//method store
		function login() {
			let email = loginInput.email
			let password = loginInput.password

			axios.post('http://127.0.0.1:8000/api/users/login', {
				email: email,
				password: password,
			}).then((response) => {
				//redirect ke post index

				localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('token_type', response.data.token_type);
                localStorage.setItem('id_user', response.data.user.id);
				localStorage.setItem('username', response.data.user.username);

				if(localStorage.getItem('username') == "admin"){
					this.$router.push({
						name: 'hotelPage'
					})
				}else{
					this.$router.push({
						name: 'tiketPage'
					})
				}
			}).catch(error => {
				//assign state validation with error
				this.validation.value = error.response.data
				console.log(error);
				console.log("ERRORANJ: ", error.response.data)

				// toaster.show(error.response.data.message, {
                //     type: "error",
                //     position: "top-right",
                //     duration: 3000,
                // });
			})
		}

		//return
		return {
			empty: [val => (val || '').length > 0 || 'This field is required'],
			loginInput,
			validation,
			login
		}
	},
}
</script>