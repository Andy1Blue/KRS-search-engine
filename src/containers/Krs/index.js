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

    var regex = /<|>|script|[^\w\s]/gi;
    var nipValue = document.getElementById("nipInput").value;
    nipValue = nipValue.trim();
    nipValue = nipValue.replace(regex , '');

    var apiURL = "";

        if (nipValue.length === 10) {
          apiURL = "https://api-v3.mojepanstwo.pl/dane/krs_podmioty.json?conditions[krs_podmioty.nip]="+nipValue;
        } else if (nipValue.length === 9 || nipValue.length  === 7 || nipValue.length === 14) {
          apiURL = "https://api-v3.mojepanstwo.pl/dane/krs_podmioty.json?conditions[krs_podmioty.regon]="+nipValue;
        } else {
          apiURL = "https://api-v3.mojepanstwo.pl/dane/krs_podmioty.json?conditions[krs_podmioty.nip]="+nipValue;
        }

      fetch(apiURL)
      .then(response => response.json())
      .then(json => {
        let apiLinkRepresantation = "https://api-v3.mojepanstwo.pl/dane/krs_podmioty/" + json["Dataobject"][0]["id"] + ".json?layers[]=reprezentacja&layers[]=prokurenci&layers[]=wspolnicy";

          fetch(apiLinkRepresantation)
          .then(response => response.json())
          .then(responsePerson => {
            let personsCount = 0;
            let personsToShow = [];

            if (responsePerson["layers"]["reprezentacja"].length > 0) {
              personsCount = responsePerson["layers"]["reprezentacja"].length;
                if (personsCount > 0) {
                  personsToShow = [];
                  for (let i = 0; i < personsCount; i++) {
                    personsToShow[i] = responsePerson["layers"]["reprezentacja"][i].nazwa + " (" + responsePerson["layers"]["reprezentacja"][i].funkcja + ")";
                  }
                }
            }

            let personsCountProxies = 0;
            let personsProxiesToShow = [];

            if (responsePerson["layers"]["prokurenci"].length > 0) {
                personsCountProxies = responsePerson["layers"]["prokurenci"].length;
                if (personsCount > 0) {
                    personsProxiesToShow = [];
                    for (let i = 0; i < personsCountProxies; i++) {
                        personsProxiesToShow[i] = responsePerson["layers"]["prokurenci"][i].nazwa + " (" + responsePerson["layers"]["prokurenci"][i].funkcja + ")";
                    }
                }
            }

            let personsCountPartners = 0;
            let personsPartnersToShow = [];

            if (responsePerson["layers"]["wspolnicy"].length > 0) {
                personsCountPartners = responsePerson["layers"]["wspolnicy"].length;
                if (personsCount > 0) {
                    personsPartnersToShow = [];
                    for (let i = 0; i < personsCountPartners; i++) {
                        personsPartnersToShow[i] = responsePerson["layers"]["wspolnicy"][i].nazwa + " (Wspólnik)";
                    }
                }
            }

            personsToShow = personsToShow.concat(personsProxiesToShow);
            personsToShow = personsToShow.concat(personsPartnersToShow);
            personsToShow = [...new Set(personsToShow)];

            this.setState({show: json['Dataobject'][0], isFetching: false, personsToShow:personsToShow})
          });

        });

  };

  render() {
      const {show,nip,isFetching,personsToShow} = this.state;
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
                <div>
                  <p><b>Wynik wyszukiwania:</b><br/><small>Aby wyszukać ponownie usuń i wpisz inny numer NIP lub REGON</small></p>

                  <ul>
                    <li><span className="liTitle">Nazwa</span>{show.data['krs_podmioty.nazwa_skrocona'] === (null || "") ? "-" : show.data['krs_podmioty.nazwa_skrocona']}<br/>{show.data['krs_podmioty.nazwa'] === (null || "") ? "-" : show.data['krs_podmioty.nazwa']}</li>
                    <li><span className="liTitle">Forma prawna</span>{show.data['krs_podmioty.forma_prawna_str'] === (null || "") ? "-" : show.data['krs_podmioty.forma_prawna_str']}</li>
                    <li><span className="liTitle">Adres</span>{show.data['krs_podmioty.adres'] === (null || "") ? "-" : show.data['krs_podmioty.adres']}</li>
                    <li><span className="liTitle">NIP</span>{show.data['krs_podmioty.nip'] === (null || "") ? "-" : show.data['krs_podmioty.nip']}</li>
                    <li><span className="liTitle">REGON</span>{show.data['krs_podmioty.regon'] === (null || "") ? "-" : show.data['krs_podmioty.regon']}</li>
                    <li><span className="liTitle">KRS</span>{show.data['krs_podmioty.krs'] === (null || "") ? "-" : show.data['krs_podmioty.krs']}</li>
                    <li><span className="liTitle">Kapitał zakładowy</span>{show.data['krs_podmioty.wartosc_kapital_zakladowy'] === (null || "") ? "-" : show.data['krs_podmioty.wartosc_kapital_zakladowy']} pln</li>
                    <li><span className="liTitle">Strona internetowa</span>{show.data['krs_podmioty.www'] === (null || "") ? "-" : show.data['krs_podmioty.www']}</li>
                    <li><span className="liTitle">Adres e-mail</span>{show.data['krs_podmioty.email'] === (null || "") ? "-" : show.data['krs_podmioty.email']}</li>

                    <li><span className="liTitle">Członkowie reprezentacji</span>{personsToShow.join(", ")}</li>

                    <li><span className="liTitle">Sposób reprezentacji</span>{show.data['krs_podmioty.sposob_reprezentacji'] === (null || "") ? "-" : show.data['krs_podmioty.sposob_reprezentacji']}</li>

                    <li><span className="liTitle">Data dokonania wpisu</span>{show.data['krs_podmioty.data_dokonania_wpisu'] === (null || "") ? "-" : show.data['krs_podmioty.data_dokonania_wpisu']}</li>
                    <li><span className="liTitle">Data ostatni wpis</span>{show.data['krs_podmioty.data_ostatni_wpis'] === (null || "") ? "-" : show.data['krs_podmioty.data_ostatni_wpis']}</li>
                    <li><span className="liTitle">Data rejestracji</span>{show.data['krs_podmioty.data_rejestracji'] === (null || "") ? "-" : show.data['krs_podmioty.data_rejestracji']}</li>
                    <li><span className="liTitle">Data wyrejestrowania przedsiebiorcy</span>{show.data['krs_podmioty.data_wyrejestrowania_przedsiebiorcy'] === null ? "-" : show.data['krs_podmioty.data_wyrejestrowania_przedsiebiorcy']}</li>
                  </ul>
                </div>
              }
          </div>
      )
  }
}

export default Krs;
