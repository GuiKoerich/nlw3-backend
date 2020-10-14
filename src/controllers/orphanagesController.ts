import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Orphanage from '../models/orphanage';
import view from '../views/orphanagesView';

export default {
  
  async index(request: Request, response: Response) {
    const orphRepository = getRepository(Orphanage);

    const orphanges = await orphRepository.find({
      relations: ['images'],
    });

    return response.json(view.renderMany(orphanges));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphRepository = getRepository(Orphanage);

    
    const orphange = await orphRepository.findOneOrFail(id, {
      relations: ['images'],
    });

    return response.json(view.render(orphange));

  },

  async create(request: Request, response: Response) {

    const {
      name, latitude, longitude, about, instructions, opening_hours, open_on_weekend
    } = request.body;

    const orphRepository = getRepository(Orphanage);

    let images;

    if(request.files !== undefined) {
      const requestImages = request.files as Express.Multer.File[];
      images = requestImages.map(image => ({ path: image.filename }))
    } 
    
    const payload = {
      name, latitude, longitude, about, instructions, opening_hours, open_on_weekend, images
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekend: Yup.bool().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(payload, {
      abortEarly: false,
    });

    const orphanage = orphRepository.create(payload);

    await orphRepository.save(orphanage);

    return response.status(201).json(orphanage);
  }
}