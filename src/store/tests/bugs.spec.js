import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { addBug, getUnresolvedBugs } from "../bugs";
import configureStore from '../configureStore'

describe("bugsSlice", () => {
    let fakeAxios;
    let store;

    beforeEach(() => {
        fakeAxios = new MockAdapter(axios);
        store = configureStore();
    });

    const bugsSlice = () => store.getState().entities.bugs;

    const createState = () => ({
        entities: {
            bugs: {
                list:[]
            }
        }
    })

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

    describe("selectors", () => {
        it("getUnresolvedBugs", () => {
            const state = createState();
            state.entities.bugs.list = [{ id: 1, resolved: true }, { id: 2 }, { id: 3 }]
            
            const result = getUnresolvedBugs(state);
                      
            expect(result).toHaveLength(2)
        })
    })
})