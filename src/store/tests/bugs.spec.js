import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { addBug } from "../bugs";
import configureStore from '../configureStore'

describe("bugsSlice", () => {
    let fakeAxios;
    let store;

    beforeEach(() => {
        fakeAxios = new MockAdapter(axios);
        store = configureStore();
    });

    const bugsSlice = () => store.getState().entities.bugs;

    it("should add the bug to the store if it's saved to the server", async () => {
        const bug = { description: "a" };
        const savedBug = { ...bug, id: 1 };
        fakeAxios.onPost("/bugs").reply(200, savedBug);

        await store.dispatch(addBug(bug));
        
        expect(bugsSlice().list).toContainEqual(savedBug)
    });

    it("should not add the bug to the store if it's not saved to the server", async () => {
        const bug = { description: "a" };
        fakeAxios.onPost("/bugs").reply(500);

        await store.dispatch(addBug(bug));
        
        expect(bugsSlice().list).toHaveLength(0);
    });
})