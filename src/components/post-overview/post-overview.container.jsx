import { connect } from "react-redux";
import { createStructuredSelector} from "reselect";
import {compose} from "redux";

import { selectIsPostFetching } from "../../redux/post/post.selectors";
import WithSpinner from "../withSpinner/with-spinner.component";
import PostOverview from "./post-overview.component";

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsPostFetching
})


const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(PostOverview);

export default CollectionsOverviewContainer;