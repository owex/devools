<template>
  <div class="hexto">
    <Heading level="2" v-if="title">
      {{ title }}
    </Heading>
    <p class="mb-3" v-if="description">
      {{ description }}
    </p>
    <div class="mb-2">
      <label class="text-xs font-bold">
        {{ hex.label }}
      </label>
      <div class="flex">
        <div class="w-full lg:w-3/4">
          <Input
            type="text"
            maxlength="7"
            :value="hex.value"
            v-model="hex.value"
            @input="inputChange"
            :placeholder="hex.placeholder"
          />
        </div>
        <div class="w-full lg:w-1/4 ml-2">
          <Input
            type="text"
            :value="hex.colorName"
            v-model="hex.colorName"
            @input="inputChange"
            placeholder="Colour Name"
          />
        </div>
      </div>
    </div>

    <prism language="javascript">{{ rgba }}</prism>
    <div class="mb-5">
      <input
        class="w-full"
        type="range"
        min="0"
        max="1"
        step="0.05"
        v-model="opacity"
        v-on:change="inputChange"
        list="tickmarks"
        id="opacity"
      />
      <datalist id="tickmarks">
        <option value="0" label="Visible" />
        <option value="0" />
        <option value="0.1" />
        <option value="0.2" />
        <option value="0.3" />
        <option value="0.4" />
        <option value="0.5" />
        <option value="0.6" />
        <option value="0.7" />
        <option value="0.8" />
        <option value="0.9" />
        <option value="1" />
      </datalist>
    </div>
    <div class="mt-2">
      <p class="text-xs font-bold">
        Palette
      </p>
      <div class="flex flex-wrap">
        <div
          v-for="(colour, index) in this.palette"
          :key="index"
          :style="{ backgroundColor: colour, width: '10%', height: '50px' }"
          class="flex flex-col justify-center items-center"
        >
          <div class="text-xs">{{colour}}</div>
        </div>
      </div>
      <p class="text-xs font-bold">
        Tints &amp; Shades
      </p>
      <div class="flex flex-wrap" v-for="(palette, name) in palettes" :key="name">
        <div
          v-for="(colour, index) in palette"
          :key="index"
          :style="{ backgroundColor: colour, width: '10%', height: '50px' }"
          class="flex flex-col justify-center items-center"
          :class="{'text-white': name === 'shades'}"
        >
          <div class="text-xs">{{colour}}</div>
        </div>
      </div>

      <Button class="mt-3" @click="tailwind.enable = !tailwind.enable" :active="this.tailwind.enable">
        Export Palette Configs for Tailwind
      </Button>
      <Button class="mt-3" @click="sass.enable = !sass.enable" :active="this.sass.enable">
        Export Palette Configs for Sass
      </Button>
      <div class="flex flex-wrap mt-1" v-if="tailwind.enable || sass.enable">
        <div class="w-full">
          <prism language="javascript" v-if="tailwind.enable">{{ tailwind.default }}</prism>
        </div>
        <div class="w-full lg:w-1/2">
          <p>Tints</p>
          <prism language="javascript" v-if="tailwind.enable">{{ tailwind.tints }}</prism>
          <prism language="sass" v-if="sass.enable">{{ sass.tintsCode }}</prism>
        </div>

        <div class="w-full lg:w-1/2">
          <p>Shades</p>
          <prism language="javascript" v-if="tailwind.enable">{{ tailwind.shades }}</prism>
          <prism language="sass" v-if="sass.enable">{{ sass.shadesCode }}</prism>
        </div>
        <a class="w-full text-xs text-gray-500 text-right" href="https://tailwindcss.com/docs/customizing-colors" rel="nofollow" target="_blank">Learn more</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
interface HexTypes {
  label: string,
  value: string,
  placeholder: string,
  default: string,
  colorName: string,
}

interface PalettesTypes {
  tints: Array<string>,
  shades: Array<string>,
}

interface TailwindTypes {
  enable: boolean,
  default: string,
  tints: string,
  shades: string
}

interface SassTypes {
  enable: boolean,
  tintsCode: string,
  shadesCode: string
}

interface ColourManagerTypes {
  title: string,
  description: string,
  opacity: number,
  hex: HexTypes,
  rgba: string,
  palettes: PalettesTypes,
  palette: Array<string>,
  tailwind: TailwindTypes,
  sass: SassTypes,
}

export default Vue.extend({
  name: 'ColourManager',
  mounted() {
    this.hexToRgb(this.hex.default);
    this.setTailwindExport();
  },
  /**
   * Vue Data Attributes
   *
   * @return  {ColourManagerTypes}
   */
  data(): ColourManagerTypes {
    return {
      title: "Colour Manager",
      description: "Generate a colour palette and RGBA from a hex colour.",
      opacity: 1,
      hex: {
        label: "Hex Colour",
        value: "",
        placeholder: `e.g. #5680e9`,
        default: '#5680e9',
        colorName: 'Cornflower Blue',
      },
      rgba: 'rgba(86, 128, 233)',
      palettes: {
        tints: [],
        shades: [],
      },
      palette: [],
      tailwind: {
        enable: false,
        default: '',
        tints: '',
        shades: '',
      },
      sass: {
        enable: false,
        tintsCode: '',
        shadesCode: '',
      }
    };
  },
  methods: {
    /**
     * Handle an input change to trigger conversion
     * @return  {void}
     */
    inputChange() {
      let hex = this.hex.value.replace("#", "");
      if ([3, 6].includes(hex.length)) {
        // Convert Shorthand to Long
        if (hex.length === 3) {
          let longhex = "";
          for (const char of hex) {
            longhex += `${char}${char}`;
          }
          hex = longhex;
        }

        this.rgba = this.hexToRgb(hex);
      }
      this.setTailwindExport();
    },
    /**
     * Convert Hex value to RGB
     *
     * @param   {string}  hex
     * @return  {string}
     */
    hexToRgb(hex: string): string {
      const result: RegExpExecArray | null = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      let r: number , g: number, b: number;

      if (result !== null) {
        r = parseInt(result[1], 16);
        g = parseInt(result[2], 16);
        b = parseInt(result[3], 16);

        this.palettes.tints = this.getShadesOrTint('tints', r, g, b);
        this.palettes.shades = this.getShadesOrTint('shades', r, g, b);

        const tints = this.palettes.tints.slice(Math.max(this.palettes.tints.length - 5, 1))
        const shades = this.palettes.shades.slice(Math.max(this.palettes.shades.length - 5, 1))

        this.palette = tints.concat(shades.reverse());

        const opacity: string = this.opacity !== 1 ? `, ${this.opacity}` : '';
        return `rgba(${r}, ${g}, ${b}${opacity})`;
      }

      return hex;
    },
    /**
     * Return a tint or shadow channel value
     *
     * @param   {string}  type
     * @param   {number}  channel
     * @param   {number}  alpha
     *
     * @return  {string}
     */
    getChannelTintOrShade(type: string, channel: number, alpha: number): string | number {
      const value = type === 'tints' ? channel + (255 - channel) * (alpha / 10) : channel * (alpha / 10) ;
      return Math.round(value);
    },
    /**
     * Return an array of colours
     *
     * @param   {string}  type
     * @param   {number}  r
     * @param   {number}  g
     * @param   {number}  b
     *
     * @return  {Array<string>}
     */
    getShadesOrTint(type: string, r: number, g: number, b: number): Array<string> {
      const colours: Array<string> = [];

      for (let i = 0; i < 10; i++) {
        let rgb = [];
        rgb.push(this.getChannelTintOrShade(type, r, i));
        rgb.push(this.getChannelTintOrShade(type, g, i));
        rgb.push(this.getChannelTintOrShade(type, b, i));

        const hexCodes = rgb.map(channelValue => {
          const hex = channelValue.toString(16);
          return hex.length == 1 ? "0" + hex : hex;
        });

        colours.push(`#${hexCodes.join('')}`);
      }

      return type === 'tints' ? colours.reverse() : colours;
    },
    setTailwindExport() {
      this.tailwind.default = this.exportDefaultPaletteForTailwind();
      this.tailwind.shades = this.exportPaletteForTailwind(this.palettes.tints, 'shades');
      this.tailwind.tints = this.exportPaletteForTailwind(this.palettes.shades, 'tints');

      this.sass.shadesCode = this.exportPaletteForSass(this.palettes.tints, 'shades');
      this.sass.tintsCode = this.exportPaletteForSass(this.palettes.shades, 'tints');
    },
    /**
     * Return formatted string for tailwind
     *
     * @param   {Array<object>}  palette
     * @param   {string}  name
     *
     * @return  {string}
     */
    exportPaletteForSass(palette: Array<string>, name: string) : string {
      const colorName = this.hex.colorName.replace(/\s+/g, '-').toLowerCase();
      let code = ``;
        palette.reverse().forEach((hex, index) => {
          const formattedLabel = (10 - index) * 100;
          const label = index !== 0 ? `-${formattedLabel}`: '';
          if (formattedLabel !== 0) {
            code += `\t $${colorName}${label}: ${hex} \n`
          }
        })
      return code;
    },
    /**
     * Return formatted string for tailwind
     *
     * @return  {string}
     */
    exportDefaultPaletteForTailwind() : string {

      let code = `'${this.hex.colorName.replace(/\s+/g, '-').toLowerCase() ?? 'colorName'}': {\n`;
      let labelIndex = 100;
      const defaultHex = this.hex.value !== '' ? this.hex.value : this.hex.default;
      code += `\tDEFAULT: '#${defaultHex.replace('#', '')}', \mn`;

      this.palette.forEach((hex, index) => {
        code += `\t'${labelIndex}': '${hex}', \n`;
        labelIndex+=100;
      });

      code += `},`;
      return code;
    },
        /**
     * Return formatted string for tailwind
     *
     * @param   {Array<object>}  palette
     * @param   {string}  name
     *
     * @return  {string}
     */
    exportPaletteForTailwind(palette: Array<string>, name: string) : string {
      let code = `'${this.hex.colorName.replace(/\s+/g, '-').toLowerCase() ?? 'colorName'}': {\n`;
        palette.reverse().forEach((hex, index) => {
          const formattedLabel = (10 - index) * 100;
          const label = index === 0 ? 'DEFAULT' : `'${formattedLabel}'`;
          if (formattedLabel !== 0) {
            code += `\t${label}: '${hex}', \n`
          }
        })

        code += `},`;
      return code;
    }
  }
});
</script>
