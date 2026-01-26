import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, Filter, MoreVertical, Mail, Calendar, Shield } from 'lucide-react';
import { getAllUsers } from '../../services/api';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all'); // 'all', 'user', 'admin'

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await getAllUsers();
            if (response.success) {
                setUsers(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filter users based on search and role
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;

        return matchesSearch && matchesRole;
    });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-50 mb-2">Users Helper</h1>
                    <p className="text-slate-400">Manage all registered users</p>
                </div>
                <Link to="/admin" className="btn-secondary">
                    Back to Dashboard
                </Link>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
                    <div className="relative flex-grow md:max-w-md">
                        <input
                            type="text"
                            placeholder="Search users by name or email..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:border-blue-500 transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                    </div>

                    <div className="flex gap-4">
                        <select
                            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-300 focus:outline-none focus:border-blue-500"
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                        >
                            <option value="all">All Roles</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>

                {/* Users Table */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        <p className="mt-4 text-slate-400">Loading users...</p>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="text-center py-12 bg-slate-900/50 rounded-lg border border-dashed border-slate-700">
                        <Users className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-300">No users found</h3>
                        <p className="text-slate-500">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-700">
                                    <th className="pb-4 pt-2 px-4 text-slate-400 font-medium">User</th>
                                    <th className="pb-4 pt-2 px-4 text-slate-400 font-medium">Role</th>
                                    <th className="pb-4 pt-2 px-4 text-slate-400 font-medium">Joined</th>
                                    <th className="pb-4 pt-2 px-4 text-slate-400 font-medium">Exam Prep</th>
                                    {/* <th className="pb-4 pt-2 px-4 text-slate-400 font-medium text-right">Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold uppercase">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-200">{user.name}</p>
                                                    <div className="flex items-center text-xs text-slate-400 mt-0.5">
                                                        <Mail className="h-3 w-3 mr-1" />
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'admin'
                                                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                                    : 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                }`}>
                                                {user.role === 'admin' && <Shield className="h-3 w-3 mr-1" />}
                                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center text-slate-300 text-sm">
                                                <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                                                {formatDate(user.createdAt)}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            {user.examPreparation ? (
                                                <span className="text-slate-300 text-sm bg-slate-700 px-2 py-1 rounded">
                                                    {user.examPreparation}
                                                </span>
                                            ) : (
                                                <span className="text-slate-500 text-sm italic">Not specified</span>
                                            )}
                                        </td>
                                        {/* <td className="py-4 px-4 text-right">
                      <button className="text-slate-400 hover:text-white p-2 hover:bg-slate-700 rounded-full transition-colors">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersList;
