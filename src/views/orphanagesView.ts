import Orphanage from '../models/orphanage';
import imagesView from './imagesView';

export default {
  render(orphanage: Orphanage) {
    
    const { 
      id, 
      name, 
      latitude, 
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekend 
    } = orphanage;

    const images = imagesView.renderMany(orphanage.images);
    
    return {
      id, name, latitude, longitude, about, instructions, opening_hours, open_on_weekend, images
    }
  },

  renderMany(orphanages: Orphanage[]) {
    return orphanages.map(orphanage => this.render(orphanage));
  },
}