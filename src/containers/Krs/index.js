import React, {Component} from 'react';
import Loader from '../../components/Loader';
import './style.css';

class Krs extends Component {
  state = {
      show: null,
      nip: null,
      isFetching: false
  }

  onSeriesInputChange = e => {
    this.setState({nip: e.target.value, isFetching: true});
    
    var regex = /<|>|script|[^\w\s]/gi;
    var nipValue = document.getElementById("nipInput").value;
    nipValue = nipValue.trim();
    nipValue = nipValue.replace(regex , '');

    var apiURL = "";

        if (nipValue.length == 10) {
          apiURL = "https://api-v3.mojepanstwo.pl/dane/krs_podmioty.json?conditions[krs_podmioty.nip]="+nipValue;
        } else if (nipValue.length == 9 || nipValue.length  == 7 || nipValue.length == 14) {
          apiURL = "https://api-v3.mojepanstwo.pl/dane/krs_podmioty.json?conditions[krs_podmioty.regon]="+nipValue;
        } else {
          apiURL = "https://api-v3.mojepanstwo.pl/dane/krs_podmioty.json?conditions[krs_podmioty.nip]="+nipValue;
        }
      fetch(apiURL)
      .then(response => response.json())
      .then(json => this.setState({show: json['Dataobject'][0], isFetching: false}));
  };

  render() {
      const {show,nip,isFetching} = this.state;
      console.log("show: "+show);

      return (
          <div className="content">
                <div>
                  <input value={nip} type="text" placeholder="Podaj NIP lub REGON spółki" id="nipInput" className="nipInput" onChange={this.onSeriesInputChange} onPaste={this.onSeriesInputChange} />
                </div>
              {!isFetching && show !== undefined && nip == null && <p><b>Wpisz NIP lub REGON, aby rozpocząć wyszukiwanie</b><br/><small>Pamiętaj, aby sprawdzić poprawność wpisywanego numeru NIP lub REGON</small></p>}
              {isFetching && <Loader />}
              {!isFetching && show === undefined && <p><b>Brak wyników lub błędne dane!</b><br/><small>Sprawdź poprawność wpisanego numeru NIP lub REGON</small></p>}
              {!isFetching && show !== null && show !== undefined && nip != null
                &&
                <p><b>Wynik wyszukiwania:</b><br/><small>Aby wyszukać ponownie usuń i wpisz inny numer NIP lub REGON</small>

                <ul>
                <li><span class="liTitle">Nazwa</span>{show.data['krs_podmioty.nazwa_skrocona'] == (null || "") ? "-" : show.data['krs_podmioty.nazwa_skrocona']}<br/>{show.data['krs_podmioty.nazwa'] == (null || "") ? "-" : show.data['krs_podmioty.nazwa']}</li>
                <li><span class="liTitle">Forma prawna</span>{show.data['krs_podmioty.forma_prawna_str'] == (null || "") ? "-" : show.data['krs_podmioty.forma_prawna_str']}</li>
                <li><span class="liTitle">Adres</span>{show.data['krs_podmioty.adres'] == (null || "") ? "-" : show.data['krs_podmioty.adres']}</li>
                <li><span class="liTitle">NIP</span>{show.data['krs_podmioty.nip'] == (null || "") ? "-" : show.data['krs_podmioty.nip']}</li>
                <li><span class="liTitle">REGON</span>{show.data['krs_podmioty.regon'] == (null || "") ? "-" : show.data['krs_podmioty.regon']}</li>
                <li><span class="liTitle">KRS</span>{show.data['krs_podmioty.krs'] == (null || "") ? "-" : show.data['krs_podmioty.krs']}</li>
                <li><span class="liTitle">Kapitał zakładowy</span>{show.data['krs_podmioty.wartosc_kapital_zakladowy'] == (null || "") ? "-" : show.data['krs_podmioty.wartosc_kapital_zakladowy']} pln</li>
                <li><span class="liTitle">Strona internetowa</span>{show.data['krs_podmioty.www'] == (null || "") ? "-" : show.data['krs_podmioty.www']}</li>
                <li><span class="liTitle">Adres e-mail</span>{show.data['krs_podmioty.email'] == (null || "") ? "-" : show.data['krs_podmioty.email']}</li>

                <li><span class="liTitle">Członkowie reprezentacji</span>TO DO</li>
                <li><span class="liTitle">Sposób reprezentacji</span>{show.data['krs_podmioty.sposob_reprezentacji'] == (null || "") ? "-" : show.data['krs_podmioty.sposob_reprezentacji']}</li>

                <li><span class="liTitle">Data dokonania wpisu</span>{show.data['krs_podmioty.data_dokonania_wpisu'] == (null || "") ? "-" : show.data['krs_podmioty.data_dokonania_wpisu']}</li>
                <li><span class="liTitle">Data ostatni wpis</span>{show.data['krs_podmioty.data_ostatni_wpis'] == (null || "") ? "-" : show.data['krs_podmioty.data_ostatni_wpis']}</li>
                <li><span class="liTitle">Data rejestracji</span>{show.data['krs_podmioty.data_rejestracji'] == (null || "") ? "-" : show.data['krs_podmioty.data_rejestracji']}</li>
                <li><span class="liTitle">Data wyrejestrowania przedsiebiorcy</span>{show.data['krs_podmioty.data_wyrejestrowania_przedsiebiorcy'] == null ? "-" : show.data['krs_podmioty.data_wyrejestrowania_przedsiebiorcy']}</li>
                </ul>
                </p>
              }
          </div>
      )
  }
}

export default Krs;
