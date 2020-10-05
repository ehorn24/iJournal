import React, { Component } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Route, Redirect } from "react-router-dom";
import MainDisplay from "./MainDisplay";
import New from "./New";
import {
  addNewJournal,
  getUserJournals,
  editJournal,
  deleteJournal,
} from "../Services/journalServices";
import {
  getUserEntries,
  addNewEntry,
  deleteEntry,
} from "../Services/entryServices";
export default class Main extends Component {
  state = {
    tags: [],
    journal: "",
    month: "",
    year: "",
    newJournalName: "",
    newJournalCover: "",
    editJournalName: "",
    editJournalCover: "",
    redirect: null,
    entryModal: false,
    entryToShow: "",
    newEntryTitle: "",
    newEntryText: "",
  };

  componentDidMount() {
    if (this.props.userInfo && this.props.userInfo.id) {
      if (this.props.journals.length === 0) {
        getUserJournals(this.props.userInfo.id).then((res) => {
          if (!res.error) {
            this.props.setParentState({ journals: res });
          }
        });
      }
      if (this.props.entries.length === 0) {
        getUserEntries(this.props.userInfo.id).then((res) => {
          if (!res.error) {
            this.props.setParentState({ entries: res });
          }
        });
      }
    }
  }

  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //Sidebar functions
  clearFilters = () => {
    this.setState({
      journal: "",
      month: "",
      year: "",
      tags: [],
    });
  };

  addTags = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      this.setState({ tags: [...this.state.tags, e.target.value] });
      e.target.value = "";
    }
  };

  removeTags = (index) => {
    this.setState({
      tags: [
        ...this.state.tags.filter(
          (tag) => this.state.tags.indexOf(tag) !== index
        ),
      ],
    });
  };

  //Journal Functions
  createNewJournal = () => {
    addNewJournal(
      this.props.userInfo.id,
      this.state.newJournalName,
      this.state.newJournalCover
    ).then((res) => {
      if (!res.error) {
        const withNewJ = this.props.journals;
        withNewJ.push(res);
        this.setState({ redirect: "/" }, () => {
          this.setState({ redirect: null });
          this.props.setParentState({ journals: withNewJ });
        });
      }
    });
  };

  editJournalItem = (id) => {
    editJournal(
      id,
      this.state.editJournalName,
      this.state.editJournalCover
    ).then((res) => {
      if (res && res.error) {
        window.alert("Journal was not updated. Please try again.");
      }
      this.setState(
        {
          redirect: `/journal/${id}/${this.state.editJournalName}`,
        },
        () => {
          this.setState({ redirect: null });
          getUserJournals(this.props.userInfo.id).then((res) => {
            this.props.setParentState({ journals: res });
          });
        }
      );
    });
  };

  handleDeleteJournal = (journal_id) => {
    deleteJournal(journal_id).then((res) => {
      if (!res.error) {
        const removeJournal = this.props.journals.filter(
          (j) => !(j.id.toString() === journal_id.toString())
        );
        const removeEntries = this.props.entries.filter(
          (ent) => !(ent.journal.toString() === journal_id.toString())
        );
        this.setState({ redirect: "/" }, () => {
          this.setState({ redirect: null });
          this.props.setParentState({ journals: removeJournal });
          this.props.setParentState({ entries: removeEntries });
        });
      }
    });
  };

  //Entry functions
  openEntryModal = (id) => {
    let entry = this.props.entries.filter((x) => x.id === id);
    this.setState({ entryModal: true, entryToShow: entry });
  };

  closeEntryModal = (e) => {
    e.preventDefault();
    this.setState({ entryModal: false });
  };

  createNewEntry = (journal_id) => {
    let journal_name = "";
    this.props.journals.map((j) => {
      if (j.id.toString() === journal_id.toString()) {
        journal_name = j.journal_name;
      }
      return journal_name;
    });
    addNewEntry(
      this.props.userInfo.id,
      journal_id,
      this.state.newEntryTitle,
      this.state.tags,
      this.state.newEntryText
    ).then((res) => {
      if (!res.error) {
        const withNewE = this.props.entries;
        withNewE.push(res);
        this.setState(
          { redirect: `/journal/${journal_id}/${journal_name}` },
          () => {
            this.setState({ redirect: null, tags: [] });
            this.props.setParentState({ entries: withNewE });
          }
        );
      }
    });
  };

  handleDeleteEntry = (entry_id, journal_id) => {
    let journal_name = "";
    this.props.journals.map((j) => {
      if (j.id.toString() === journal_id.toString()) {
        journal_name = j.journal_name;
      }
      return journal_name;
    });
    deleteEntry(entry_id).then((res) => {
      if (!res.error) {
        const removeEntry = this.props.entries.filter(
          (ent) => !(ent.id === entry_id)
        );
        this.setState(
          {
            redirect: `/journal/${journal_id}/${journal_name}`,
          },
          () => {
            this.setState({ redirect: null });
            this.props.setParentState({ entries: removeEntry });
          }
        );
      }
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <>
        <Header
          user={this.props.userInfo.firstname}
          handleLogOut={this.props.handleLogOut}
        />
        <Route
          exact
          path="/"
          render={(props) => (
            <>
              <Sidebar
                page="main"
                entries={this.props.entries}
                journals={this.props.journals}
                tags={this.state.tags}
                addTags={this.addTags}
                removeTags={this.removeTags}
                handleFormChange={this.handleFormChange}
                clearFilters={this.clearFilters}
              />
              <MainDisplay
                {...props}
                page="main"
                entries={this.props.entries}
                journals={this.props.journals}
                journal={this.state.journal}
                month={this.state.month}
                year={this.state.year}
                tags={this.state.tags}
                openEntryModal={this.openEntryModal}
                closeEntryModal={this.closeEntryModal}
                entryModal={this.state.entryModal}
                entryToShow={this.state.entryToShow}
                handleDeleteEntry={this.handleDeleteEntry}
                handleDeleteJournal={this.handleDeleteJournal}
              />
            </>
          )}
        />
        <Route
          path="/journal/:journal_id/:journal_name"
          render={(props) => (
            <>
              <Sidebar
                page="journal"
                entries={this.props.entries}
                journals={this.props.journals}
                tags={this.state.tags}
                addTags={this.addTags}
                removeTags={this.removeTags}
                handleFormChange={this.handleFormChange}
                clearFilters={this.clearFilters}
              />
              <MainDisplay
                {...props}
                page="journal"
                entries={this.props.entries}
                journals={this.props.journals}
                journal={this.state.journal}
                month={this.state.month}
                year={this.state.year}
                tags={this.state.tags}
                openEntryModal={this.openEntryModal}
                closeEntryModal={this.closeEntryModal}
                entryModal={this.state.entryModal}
                entryToShow={this.state.entryToShow}
                handleDeleteEntry={this.handleDeleteEntry}
                handleDeleteJournal={this.handleDeleteJournal}
              />
            </>
          )}
        />
        <Route
          path={["/new/:type/:id", "/new/:type"]}
          render={(props) => (
            <>
              <New
                {...props}
                action="new"
                handleFormChange={this.handleFormChange}
                createNewJournal={this.createNewJournal}
                createNewEntry={this.createNewEntry}
                tags={this.state.tags}
                addTags={this.addTags}
                removeTags={this.removeTags}
                journalCover={this.state.newJournalCover}
              />
            </>
          )}
        />
        <Route
          path="/edit/journal/:id"
          render={(props) => (
            <New
              {...props}
              action="edit"
              handleFormChange={this.handleFormChange}
              editJournalItem={this.editJournalItem}
              editJournalCover={this.state.editJournalCover}
            />
          )}
        />
      </>
    );
  }
}
