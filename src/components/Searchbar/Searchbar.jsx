import { Component } from 'react';
import styles from 'styles.module.css';

export class Searchbar extends Component {
	state = {
		value: '',
	}

	handleChange = ({ target: { value } }) => {
		this.setState({ value })
	}

	handleSubmit = (e) => {
		e.preventDefault()
		// if (!this.state.value) {
		// 	return toast.error('Error')
		// }
		this.props.onSearch(this.state.value)
		this.setState({ value: '' })
	}


  render() {
    return (
      <>
        <header className={styles.Searchbar}>
          <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={styles.SearchForm_button}>
              <span className="button-label">Search</span>
            </button>

            <input
              className={styles.SearchForm_input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </form>
        </header>
      </>
    );
  }
}
