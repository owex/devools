<template>
  <div class="password-generator">
    <div>
      <Heading level="2" v-if="title">
        {{ title }}
      </Heading>
      <p class="mb-3" v-if="description">
        {{ description }}
      </p>
    </div>
    <div class="password-generator__tool">
      <div>
        <label class="relative block mb-3 p-10 bg-gray-300" for="password-generator">
          <input
            type="text"
            class="w-full text-xl bg-transparent border-0 focus:outline-none"
            v-model="password"
            id="password-generator"
            placeholder="Generate a password"
          />
          <div
            @click="copyPassword()"
            class="absolute bottom-0 right-0 px-3 py-2 text-xs font-bold border-t-2 border-l-2 border-white cursor-pointer hover:bg-white"
            v-if="charsetMap.length > 0 && password !== ''"
          >
            Copy
          </div>
        </label>
        <h3 class="text-lg">
          Options
        </h3>
        <div class="mb-3">
          <label class="text-xs font-bold" for="length"> Length </label>
          <Input
            type="number"
            v-model="length"
            :id="length"
            v-on:keyup="inputChange()"
            min="1"
          />
        </div>

        <div class="flex flex-wrap mb-3">
          <div class="w-full xl:w-1/2 border xl:p-2" v-for="(item, index) in charsets" :key="index">
            <input
              type="checkbox"
              :value="item.set"
              :id="index"
              v-model="charsetMap"
              @change="inputChange()"
              :checked="item.status"
            />
            <label :for="index">
              <b class="font-bold">{{ item.text }} </b> <br />
              <small class="text-xs">
                {{ item.set }}
              </small>
            </label>
          </div>
        </div>
      </div>
      <div
        v-if="charsetMap.length > 0"
      >
        <Button @click="generatePassword()">Generate</Button>
        <Button @click="generatePassword(true)">
          Generate and Copy
        </Button>
        <Button @click="clear()">
          Clear <span>All</span>
        </Button>
      </div>
      <div class="mt-3" v-if="list.length > 1">
        <Heading level="3">
          Previous Passwords
        </Heading>
        <div class="border p-3">
          <div class="overflow-auto h-32">
            <div
              v-for="pwd in previousPasswords"
              :key="pwd"
            >
              <Input type="text" :value="pwd" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Password Generator",
      description: "",
      charsets: {
        numbers: {
          text: "Numbers",
          set: "0123456789",
        },
        lowercase: {
          text: "Letters Lowercase",
          set: "abcdefghijklmnopqrstuvwxyz",
        },
        caps: {
          text: "Letters Uppercase",
          set: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        },
        special: {
          text: "ASCII symbols",
          set: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
        },
      },
      charsetMap: [
        "0123456789",
        "abcdefghijklmnopqrstuvwxyz",
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
      ],
      charset: "",
      password: "",
      length: 15,
      list: [],
    };
  },
  mounted: function () {
    this.generatePassword();
  },
  methods: {
    clear() {
      this.list = [];
      this.password = "";
    },
    inputChange() {
      this.generatePassword();
    },
    copyPassword() {
      const password = document.getElementById("password-generator");
      password.select();
      document.execCommand("copy");
    },
    getCharacter() {
      let text = "";
      let charset = this.charsetMap.join("");
      this.charset = this.charsetMap.join("");

      text = charset.charAt(Math.floor(Math.random() * charset.length));

      return text;
    },
    generatePassword(copy) {
      if (this.password !== "") {
        this.list.push(this.password);
      }

      let password = "";

      for (let i = 0; i < this.length; i++) {
        password = password + this.getCharacter();
      }
      this.password = password;
      if (copy) {
        setTimeout(() => {
          this.copyPassword();
        }, 100);
      }
    },
  },
  computed: {
    previousPasswords() {
      return this.list.slice().reverse().filter(pwd => {
        return pwd !== '';
      });
    }
  }
};
</script>
