import { fetchShows } from "../fetchShows";
import { isLoading, getShows, setError } from "../../actions/index";

describe("fetchShows Thunk", () => {
  let mockDispatch;
  let mockUrl;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockUrl = "www.dragme.com";
    window.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
            json: () => Promise.resolve(mockShows),
            ok:true
        })  
      )
  });

  it("should call dispatch with isLoading(true)", () => {
    let thunk = fetchShows(mockUrl, getShows, "GET");
    thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true));
  });
  
  it("should dispatch setError with a message if the response is not okay ", async() => {
      window.fetch=jest.fn().mockImplementation(()=> 
          Promise.resolve({
              ok:false,
              statusText: "Error has occured"
          })
      )
      let thunk = await fetchShows(mockUrl, getShows, "GET", isLoading(true));
      await thunk(mockDispatch);
      expect(mockDispatch).toHaveBeenCalledWith(isLoading(true));
  });

  it.skip("should dispatch saveShows", async () => {
      let mockShows = {name: "Drag Show", date: "Tomorrow", description: "Best Drag Show ever", event_url: 'URL', poster_url: "URL"}
      const thunk = await fetchShows(mockUrl, getShows, "GET");
      await thunk(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith(fetchShows(mockShows));
  })


});
