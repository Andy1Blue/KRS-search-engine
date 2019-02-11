import React from 'react';
import {Component} from 'react';
import './style.css';

class Footer extends Component {
  render() {
    return (
    <p className="App-footer">
        © blueapp.ovh/krs
        <br/>Źródło danych: https://mojepanstwo.pl/api
        <br/>Żadne dane nie są przechowywane na naszym serwerze.
        <br/>Nie odpowiadamy za popoprawność danych.
    </p>
  )
}

}

export default Footer;
