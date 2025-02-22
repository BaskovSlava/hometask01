import {req} from './test-helpers'
import {setDB} from '../src/db/db'
import {dataset1} from './datasets'
import {SETTINGS} from '../src/settings'
import {Resolutions} from "../src/input-output-types/video-types";

describe('/videos', () => {
    beforeAll(async () => { // очистка базы данных перед началом тестирования
        setDB()
    })

    it('should return 400 when title is null', async () => {
        const response = await req
            .post('/videos')
            .send({
                title: null,
                author: 'Author',
                description: 'Description',
                availableResolutions: ['P720']
            });

        expect(response.status).toBe(400);
        expect(response.body.errorsMessages).toEqual([
            { message: 'error!', field: 'title' }
        ]);
    });

    it('should return 200 and empty array', async () => {
        await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200, [])
    })

    it('should return 404 for not existing video', async () => {
        await req
            .get(`${SETTINGS.PATH.VIDEOS}/1000`)
            .expect(404)
    })

    it('should create new video', async () => {
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({title: "1", author: "52", availableResolutions: [`${Resolutions.P144}`]})
            .expect(201)
        console.log(res.body) // можно посмотреть ответ эндпоинта

    })
    it('should not create new video', async () => {
        await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({title: "", author: "", availableResolutions: [`${Resolutions.P144}`]})
            .send({title: "", author: "", availableResolutions: [`${Resolutions.P2160}`]})
            .send({title: "", author: "", availableResolutions: [`${Resolutions.P720}`]})
            .expect(400)
    })
    it('should not update with incorrect input data', async () => {
        await req
            .post(SETTINGS.PATH.VIDEOS)
            .send({title: "", author: "", availableResolutions: [`${Resolutions.P1080}`], minAgeRestriction: "", publicationDate: ""})
            .expect(400)

        await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200, [])
    })
    it("should get empty array", async () => {
        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)
        console.log(res.body)
    })
    it("should get not empty array", async () => {
        setDB(dataset1) // заполнение бд начальными данными, если нужно

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)
        console.log(res.body)

        expect(res.body.length).toBe(1)
    })


})