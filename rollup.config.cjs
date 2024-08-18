import typescript from '@rollup/plugin-typescript';
import { dts } from "rollup-plugin-dts";

export default [
  {
    input: 'src/index.ts',
    plugins: [
      typescript(),
    ],
    output: {
        file: 'dist/index.cjs',
        format: 'cjs',
    },
    external: ['dotenv/config', 'discord.js'],
  }, 
  {
    input: "src/index.ts",
    output: [{ file: "dist/types.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
