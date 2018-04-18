import _ from 'lodash'

import themeApathy from './themes/apathy'
import themeAshes from './themes/ashes'
import themeAtelierdune from './themes/atelier-dune'
import themeAtelierforest from './themes/atelier-forest'
import themeAtelierheath from './themes/atelier-heath'
import themeAtelierlakeside from './themes/atelier-lakeside'
import themeAtelierseaside from './themes/atelier-seaside'
import themeBespin from './themes/bespin'
import themeBrewer from './themes/brewer'
import themeBright from './themes/bright'
import themeChalk from './themes/chalk'
import themeCodeschool from './themes/codeschool'
import themeColors from './themes/colors'
import themeDefault from './themes/default'
import themeEighties from './themes/eighties'
import themeEmbers from './themes/embers'
import themeFlat from './themes/flat'
import themeGoogle from './themes/google'
import themeGrayscale from './themes/grayscale'
import themeGreenscreen from './themes/greenscreen'
import themeHarmonic from './themes/harmonic'
import themeHopscotch from './themes/hopscotch'
import themeIndex from './themes/index'
import themeIsotope from './themes/isotope'
import themeMarrakesh from './themes/marrakesh'
import themeMocha from './themes/mocha'
import themeMonokai from './themes/monokai'
import themeNicinabox from './themes/nicinabox'
import themeOcean from './themes/ocean'
import themeParaiso from './themes/paraiso'
import themePop from './themes/pop'
import themeRailscasts from './themes/railscasts'
import themeShapeshifter from './themes/shapeshifter'
import themeSolarized from './themes/solarized'
import themeSummerfruit from './themes/summerfruit'
import themeThreezerotwofour from './themes/threezerotwofour'
import themeTomorrow from './themes/tomorrow'
import themeTube from './themes/tube'
import themeTwilight from './themes/twilight'

export const THEMES = {
  Apathy: themeApathy,
  Ashes: themeAshes,
  Atelierdune: themeAtelierdune,
  Atelierforest: themeAtelierforest,
  Atelierheath: themeAtelierheath,
  Atelierlakeside: themeAtelierlakeside,
  Atelierseaside: themeAtelierseaside,
  Bespin: themeBespin,
  Brewer: themeBrewer,
  Bright: themeBright,
  Chalk: themeChalk,
  Codeschool: themeCodeschool,
  Colors: themeColors,
  Default: themeDefault,
  Eighties: themeEighties,
  Embers: themeEmbers,
  Flat: themeFlat,
  Google: themeGoogle,
  Grayscale: themeGrayscale,
  Greenscreen: themeGreenscreen,
  Harmonic: themeHarmonic,
  Hopscotch: themeHopscotch,
  Index: themeIndex,
  Isotope: themeIsotope,
  Marrakesh: themeMarrakesh,
  Mocha: themeMocha,
  Monokai: themeMonokai,
  Nicinabox: themeNicinabox,
  Ocean: themeOcean,
  Paraiso: themeParaiso,
  Pop: themePop,
  Railscasts: themeRailscasts,
  Shapeshifter: themeShapeshifter,
  Solarized: themeSolarized,
  Summerfruit: themeSummerfruit,
  Threezerotwofour: themeThreezerotwofour,
  Tomorrow: themeTomorrow,
  Tube: themeTube,
  Twilight: themeTwilight
}

export const INITIAL_SETTINGS = _.merge({}, {
  enabled: true,
  invertTheme: true,
  conditionalExpandAll: false,
  theme: 'Default'
})
