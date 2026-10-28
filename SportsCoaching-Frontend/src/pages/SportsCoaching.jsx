
import { useCallback, useEffect, useState } from 'react';
import {
  addSport,
  deleteSport,
  getAllSports,
  getSportById,
  updateSport
} from '../services/sportsCoachingService';

const emptyForm = {
  sportName: '',
  coachName: '',
  studentCount: '',
  active: true
};

export default function SportsCoaching() {
  const [page, setPage] = useState('home');
  const [sports, setSports] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [selectedSport, setSelectedSport] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loadSports = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllSports();
      setSports(Array.isArray(response.data) ? response.data : []);
      setError('');
    } catch (err) {
      setError('Unable to connect to the backend. Check port 8081.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSports();
  }, [loadSports]);

  const activeCount = sports.filter(s => s.active).length;
  const inactiveCount = sports.length - activeCount;

  const changeField = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(current => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const openAdd = () => {
    resetForm();
    setMessage('');
    setError('');
    setPage('add');
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const payload = {
      sportName: form.sportName.trim(),
      coachName: form.coachName.trim(),
      studentCount: Number(form.studentCount),
      active: Boolean(form.active)
    };

    if (
      !payload.sportName ||
      !payload.coachName ||
      form.studentCount === '' ||
      !Number.isInteger(payload.studentCount) ||
      payload.studentCount < 0
    ) {
      setError('Please enter valid details. Student count cannot be negative.');
      return;
    }

    try {
      if (editingId !== null) {
        await updateSport(editingId, payload);
        setMessage('Programme updated successfully.');
      } else {
        await addSport(payload);
        setMessage('Programme added successfully. ID generated automatically.');
      }

      resetForm();
      await loadSports();
      setPage('view');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save the programme.');
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      sportName: item.sportName || '',
      coachName: item.coachName || '',
      studentCount: String(item.studentCount ?? ''),
      active: Boolean(item.active)
    });
    setMessage('');
    setError('');
    setPage('add');
  };

  const searchRecord = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setError('');
    setMessage('');
    setSelectedSport(null);

    try {
      const response = await getSportById(searchId.trim());
      setSelectedSport(response.data);
    } catch (err) {
      setError(
        err.response?.status === 404
          ? 'No programme found with this ID.'
          : 'Unable to search. Check the backend.'
      );
    }
  };

  const removeRecord = async (id) => {
    if (!window.confirm(`Delete programme ${id}?`)) return;

    setError('');
    setMessage('');

    try {
      await deleteSport(id);
      setMessage('Programme deleted successfully.');
      if (editingId === id) resetForm();
      if (selectedSport?.id === id) setSelectedSport(null);
      await loadSports();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete programme.');
    }
  };

  const showDetails = (item) => {
    setSelectedSport(item);
    setPage('search');
    setSearchId(String(item.id));
  };

  return (
    <div className="app-shell">

      <header className="navbar">
        <div className="brand">
          <div className="brand-logo">SC</div>
          <div>
            <strong>SportsCoaching</strong>
            <small>SPORTS MANAGEMENT</small>
          </div>
        </div>

        <nav>
          <button className={page === 'home' ? 'nav-active' : ''} onClick={() => setPage('home')}>⌂ Home</button>
          <button className={page === 'add' ? 'nav-active' : ''} onClick={openAdd}>＋ Add Programme</button>
          <button className={page === 'view' ? 'nav-active' : ''} onClick={() => { setPage('view'); loadSports(); }}>▤ View Programmes</button>
          <button className={page === 'search' ? 'nav-active' : ''} onClick={() => { setPage('search'); setSelectedSport(null); }}>⌕ Search by ID</button>
        </nav>
      </header>

      {page === 'home' && (
        <>
          <section className="hero">
            <span className="hero-label">🏅 SPORTS MANAGEMENT SYSTEM</span>
            <h1>Sports Coaching <span>Management</span></h1>
            <p>Manage coaching programmes, coaches and student registrations in one place.</p>
            <div className="hero-actions">
              <button className="gold-button" onClick={openAdd}>＋ Add Programme</button>
              <button className="outline-button" onClick={() => setPage('view')}>▤ View All Programmes</button>
            </div>
          </section>

          <main className="dashboard">
            <div className="stats-grid">
              <div className="stat-card">
                <span>🏅</span>
                <div><strong>{sports.length}</strong><small>TOTAL PROGRAMMES</small></div>
              </div>
              <div className="stat-card green">
                <span>✓</span>
                <div><strong>{activeCount}</strong><small>ACTIVE PROGRAMMES</small></div>
              </div>
              <div className="stat-card gold">
                <span>◷</span>
                <div><strong>{inactiveCount}</strong><small>INACTIVE PROGRAMMES</small></div>
              </div>
              <div className="stat-card navy">
                <span>●</span>
                <div><strong>LIVE</strong><small>API STATUS</small></div>
              </div>
            </div>

            <h2 className="section-heading">Quick Actions</h2>
            <div className="quick-grid">
              <button className="quick-card" onClick={openAdd}>
                <span>＋</span>
                <strong>Add New Programme</strong>
                <small>Register a new sports coaching programme.</small>
              </button>
              <button className="quick-card" onClick={() => setPage('view')}>
                <span>▤</span>
                <strong>View All Programmes</strong>
                <small>View, edit and delete existing records.</small>
              </button>
              <button className="quick-card" onClick={() => { setPage('search'); setSelectedSport(null); }}>
                <span>⌕</span>
                <strong>Search by ID</strong>
                <small>Find a particular programme by its ID.</small>
              </button>
            </div>
          </main>
        </>
      )}

      {page !== 'home' && (
        <section className="page-banner">
          <div>
            <p>SPORTSCOACHING MANAGEMENT</p>
            <h1>
              {page === 'add' && (editingId ? '✎ Update Programme' : '＋ Add New Programme')}
              {page === 'view' && '▤ View All Programmes'}
              {page === 'search' && '⌕ Search Programme'}
            </h1>
            <small>Manage your sports coaching records</small>
          </div>
          {page === 'view' && <button className="gold-button" onClick={openAdd}>＋ Add Programme</button>}
        </section>
      )}

      <main className="page-content">

        {message && <div className="notice success">{message}</div>}
        {error && <div className="notice error">{error}</div>}

        {page === 'add' && (
          <div className="form-card">
            <div className="card-title">
              <h2>🏅 Programme Details</h2>
              <small>All fields are required</small>
            </div>

            <form onSubmit={submitForm}>
              <label>Sport Name *
                <input name="sportName" value={form.sportName} onChange={changeField} required maxLength="100" />
              </label>
              <label>Coach Name *
                <input name="coachName" value={form.coachName} onChange={changeField} required maxLength="100" />
              </label>
              <label>Student Count *
                <input name="studentCount" type="number" min="0" step="1" value={form.studentCount} onChange={changeField} required />
              </label>

              <label className="active-field">
                <span>Active Programme</span>
                <input name="active" type="checkbox" checked={form.active} onChange={changeField} />
              </label>

              <button className="submit-button" type="submit">
                {editingId !== null ? '✓ Save Changes' : '✓ Add Programme'}
              </button>

              {editingId !== null && (
                <button className="cancel-button" type="button" onClick={resetForm}>Cancel</button>
              )}
            </form>

            <div className="info-box">
              ℹ The Programme ID is automatically assigned by the database. You do not need to enter it.
            </div>
          </div>
        )}

        {page === 'view' && (
          <div className="table-card">
            <div className="card-title table-heading">
              <h2>All Sports Programmes</h2>
              <span>{sports.length} records</span>
            </div>

            {loading ? <p className="empty-state">Loading programmes...</p> :
              sports.length === 0 ? <p className="empty-state">No programmes found. Add your first programme.</p> :
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>SPORT NAME</th>
                      <th>COACH NAME</th>
                      <th>STUDENTS</th>
                      <th>STATUS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sports.map(item => (
                      <tr key={item.id}>
                        <td>#{item.id}</td>
                        <td><strong>{item.sportName}</strong></td>
                        <td>{item.coachName}</td>
                        <td>{item.studentCount}</td>
                        <td><span className={`status ${item.active ? 'active' : 'inactive'}`}>{item.active ? '✓ Active' : 'Inactive'}</span></td>
                        <td className="actions">
                          <button onClick={() => showDetails(item)}>View</button>
                          <button onClick={() => startEdit(item)}>Edit</button>
                          <button onClick={() => removeRecord(item.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }

            <button className="refresh-button" onClick={loadSports}>↻ Refresh List</button>
          </div>
        )}

        {page === 'search' && (
          <div className="search-card">
            <div className="card-title"><h2>Enter Programme ID</h2></div>
            <form className="search-form" onSubmit={searchRecord}>
              <input type="number" min="1" value={searchId} onChange={e => setSearchId(e.target.value)} placeholder="Enter Programme ID" required />
              <button className="submit-button">⌕ Search</button>
              <button type="button" className="cancel-button" onClick={() => { setSearchId(''); setSelectedSport(null); setError(''); }}>Clear</button>
            </form>

            {selectedSport && (
              <div className="details-card">
                <div className="card-title"><h2>Programme Details</h2><span>#{selectedSport.id}</span></div>
                <div className="details-grid">
                  <div><small>SPORT NAME</small><strong>{selectedSport.sportName}</strong></div>
                  <div><small>COACH NAME</small><strong>{selectedSport.coachName}</strong></div>
                  <div><small>STUDENT COUNT</small><strong>{selectedSport.studentCount}</strong></div>
                  <div><small>PROGRAMME STATUS</small><strong>{selectedSport.active ? '✓ Active' : 'Inactive'}</strong></div>
                </div>
                <div className="detail-actions">
                  <button className="gold-button" onClick={() => startEdit(selectedSport)}>✎ Edit Programme</button>
                  <button className="cancel-button" onClick={() => setSelectedSport(null)}>Clear Details</button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer>
        SportsCoaching © 2026 · Sports Coaching Management System · <span>com.klef.soa.docker</span> · Port 8081
      </footer>
    </div>
  );
}
