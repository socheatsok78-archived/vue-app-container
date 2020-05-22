import axios from 'axios'
import AppContainer from '../../src'
import {ServiceContainer} from '../../src'

import Config from '../../src/core/foundations/Config'

describe('AppContainer', () => {
    it('should be able to create new instance', () => {
        const $app = new AppContainer()
        expect($app).toBeInstanceOf(AppContainer)
    })

    it('should be able to listen to ready event', () => {
        const callback = jest.fn()
        AppContainer.ready(callback)
        const $app = new AppContainer()
        expect(callback).toHaveBeenCalled()
        expect($app).toBeInstanceOf(AppContainer)
    })

    it('$app.services should be instance of ServiceContainer', () => {
        const $app = new AppContainer()
        expect($app.services).toBeInstanceOf(ServiceContainer)
    })

    it('$app.http should be able to make a get() request', () => {
        const $app = new AppContainer()
        $app.http.get = jest.fn()
        $app.http.get()
        expect($app.http.get).toHaveBeenCalled()
    })

    it('$app.http should be able to make a post() request', () => {
        const $app = new AppContainer()
        $app.http.post = jest.fn()
        $app.http.post()
        expect($app.http.post).toHaveBeenCalled()
    })

    it('$app.http should be able to make a put() request', () => {
        const $app = new AppContainer()
        $app.http.put = jest.fn()
        $app.http.put()
        expect($app.http.put).toHaveBeenCalled()
    })

    it('$app.http should be able to make a patch() request', () => {
        const $app = new AppContainer()
        $app.http.patch = jest.fn()
        $app.http.patch()
        expect($app.http.patch).toHaveBeenCalled()
    })

    it('$app.http should be able to make a delete() request', () => {
        const $app = new AppContainer()
        $app.http.delete = jest.fn()
        $app.http.delete()
        expect($app.http.delete).toHaveBeenCalled()
    })
})
