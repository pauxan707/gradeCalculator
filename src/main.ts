import { Notice, Plugin } from "obsidian";

export default class GradeCalculatorPlugin extends Plugin {
  async onload() {
    new Notice("Plugin cargado");
  }
}