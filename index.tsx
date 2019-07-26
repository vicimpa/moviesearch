import React from "react";
import {render} from "react-dom";

import "./index.sass";

import { Main } from "./components/Main";

async function main() {
  const mainElement = document.querySelector('#main')
  render(<Main />, mainElement)
}

main().catch(console.error)