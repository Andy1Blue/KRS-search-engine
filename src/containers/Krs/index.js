import React, {Component} from 'react';
import Loader from '../../components/Loader';
import './style.css';

class Krs extends Component {
  state = {
      show: null,
      nip: '',
      isFetching: false
  }

  onSeriesInputChange = e => {
          this.setState({nip: e.target.value, isFetching: true});
      fetch(`https://api-v3.mojepanstwo.pl/dane/krs_podmioty.json?conditions[krs_podmioty.nip]=${e.target.value}`)
      .then(response => response.json())
      .then(json => this.setState({show: json['Dataobject'][0], isFetching: false}));
  };

  render() {
      const {show,nip,isFetching} = this.state;
      console.log("show: "+show);

      return (
          <div className="content">
                <div>
                  <input value={nip} type="text" placeholder="Podaj NIP spółki" id="nipInput" className="nipInput" onChange={this.onSeriesInputChange} onPaste={this.onSeriesInputChange} />
                </div>
              {!isFetching && show !== undefined && <p><b>Wpisz NIP, aby rozpocząć wyszukiwanie</b></p>}
              {isFetching && show === null && <Loader />}
              {isFetching && show === undefined && <Loader />}
              {!isFetching && show === undefined && <p><b>Brak wyników lub błędne dane!</b></p>}
              {!isFetching && show !== null && show !== undefined
                &&
                <table>
                <tr><td colspan='2'><big>{show.data['krs_podmioty.nazwa_skrocona']}</big><br/><small>{show.data['krs_podmioty.nazwa']}</small></td></tr>
                       <tr><td>Forma prawna</td><td>{show.data['krs_podmioty.forma_prawna_str']}</td></tr>
                             <tr><td>ADRES</td><td>{show.data['krs_podmioty.adres']}</td></tr>
                           <tr><td>NIP</td><td>{show.data['krs_podmioty.nip']}</td></tr>
                           <tr><td>REGON</td><td>{show.data['krs_podmioty.regon']}</td></tr>
                               "<tr><td>KRS</td><td>{show.data['krs_podmioty.krs']}</td></tr>
                 <tr><td>Kapitał zakładowy</td><td>{show.data['krs_podmioty.wartosc_kapital_zakladowy']} pln</td></tr>
                             <tr><td>Strona internetowa</td><td>{show.data['krs_podmioty.www']}</td></tr>
                               <tr><td>Adres e-mail</td><td>{show.data['krs_podmioty.email']}</td></tr>

                                 <tr><td>Członkowie reprezentacji</td><td>" + personsToShow.join("") + "</td></tr>
                              <tr><td>Sposób reprezentacji</td><td>{show.data['krs_podmioty.sposob_reprezentacji']}</td></tr>

                                <tr><td>Data dokonania wpisu</td><td>{show.data['krs_podmioty.data_dokonania_wpisu']}</td></tr>
                             <tr><td>Data ostatni wpis</td><td>{show.data['krs_podmioty.data_ostatni_wpis']}</td></tr>
                               <tr><td>Data rejestracji</td><td>{show.data['krs_podmioty.data_rejestracji']}</td></tr>
                                   <tr><td>Data wyrejestrowania przedsiebiorcy</td><td>{show.data['krs_podmioty.data_wyrejestrowania_przedsiebiorcy']}</td></tr>
                                 </table>
              }
          </div>
      )
  }
}

export default Krs;
