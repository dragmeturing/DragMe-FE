import { fetchShows } from "../fetchShows";
import { isLoading, getShows, setError } from "../../actions/index";

describe("fetchShows Thunk", () => {
  let mockDispatch;
  let mockUrl;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockUrl = "www.dragme.com";
  });

  it("should call dispatch with isLoading(true)", () => {
    const thunk = fetchShows(mockUrl, getShows, "GET");
    thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true));
  });
});
