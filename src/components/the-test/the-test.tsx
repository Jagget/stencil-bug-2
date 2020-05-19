import {Component, Host, h, State} from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'the-test',
  styleUrl: 'the-test.css',
  shadow: true,
})
export class TheTest {
  @State() text = 111;

  componentWillLoad() {
    axios
      .get('http://www.mocky.io/v2/5ec3f43d3000007eae39c5ba')
      .then(() => (this.text = 222))
      .catch(() => (this.text = 333));
  }

  render() {
    return <Host>{this.text}</Host>;
  }
}
