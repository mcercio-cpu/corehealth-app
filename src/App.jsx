import { useState } from 'react';
import './styles/globals.css';

// Shared screens
import SplashScreen from './pages/shared/SplashScreen';
import PersonaSelect from './pages/shared/PersonaSelect';

// Senior (Dona Rosa) screens
import SeniorHome from './pages/senior/SeniorHome';
import SeniorDados from './pages/senior/SeniorDados';
import SeniorHistorico from './pages/senior/SeniorHistorico';
import SeniorMedicamentos from './pages/senior/SeniorMedicamentos';
import SeniorDefinicoes from './pages/senior/SeniorDefinicoes';
import SeniorVoiceFlow from './pages/senior/SeniorVoiceFlow';
import VoiceAI from './pages/shared/VoiceAI';

// Adult (Ricardo) screens
import AdultHome from './pages/adult/AdultHome';
import AdultFamilia from './pages/adult/AdultFamilia';
import AdultConsultas from './pages/adult/AdultConsultas';
import AdultAlertas from './pages/adult/AdultAlertas';
import AdultPerfil from './pages/adult/AdultPerfil';

export default function App() {
  const [appState, setAppState] = useState('splash');
  const [persona, setPersona] = useState(null);
  const [screen, setScreen] = useState(null);
  const [lang, setLang] = useState('pt');

  const goToPersona = (selectedLang) => {
    if (selectedLang) setLang(selectedLang);
    setAppState('persona');
  };

  const selectPersona = (p) => {
    setPersona(p);
    setScreen('home');
    setAppState(p);
  };

  const navigate = (dest) => {
    if (dest === 'logout') { onLogout(); return; }
    if (dest === 'persona') { setAppState('persona'); setPersona(null); setScreen(null); return; }
    setScreen(dest);
  };

  const onLogout = () => {
    setAppState('splash');
    setPersona(null);
    setScreen(null);
  };

  const renderScreen = () => {
    if (appState === 'splash') return <SplashScreen onFinish={goToPersona} lang={lang} setLang={setLang} />;
    if (appState === 'persona') return <PersonaSelect onSelect={selectPersona} lang={lang} />;

    const props = { navigate, onLogout, lang };

    if (appState === 'senior') {
      switch (screen) {
        case 'dados':        return <SeniorDados {...props} />;
        case 'historico':    return <SeniorHistorico {...props} />;
        case 'medicamentos': return <SeniorMedicamentos {...props} />;
        case 'definicoes':   return <SeniorDefinicoes {...props} />;
        case 'voz':          return <VoiceAI {...props} persona="senior" />;
        default:             return <SeniorHome {...props} />;
      }
    }

    if (appState === 'adult') {
      switch (screen) {
        case 'core':      return <VoiceAI {...props} persona="adult" />;
        case 'familia':   return <AdultFamilia {...props} />;
        case 'consultas': return <AdultConsultas {...props} />;
        case 'alertas':   return <AdultAlertas {...props} />;
        case 'perfil':    return <AdultPerfil {...props} />;
        default:          return <AdultHome {...props} />;
      }
    }

    return <SplashScreen onFinish={goToPersona} lang={lang} setLang={setLang} />;
  };

  return (
    <div className="phone-frame">
      <div className="phone-notch" />
      {renderScreen()}
    </div>
  );
}
