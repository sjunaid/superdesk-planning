# -*- coding: utf-8; -*-
#
# This file is part of Superdesk.
#
#  Copyright 2013, 2014, 2015, 2016, 2017, 2018 Sourcefabric z.u. and contributors.
#
# For the full copyright and license information, please see the
# AUTHORS and LICENSE files distributed with this source code, or
# at https://www.sourcefabric.org/superdesk/license

"""Superdesk Planning - Planning Autosaves"""

from superdesk import Resource
from .planning import planning_schema
from superdesk.metadata.utils import item_url


class PlanningAutosaveResource(Resource):
    url = 'planning_autosave'
    item_url = item_url

    resource_methods = ['GET', 'POST']
    item_methods = ['GET', 'PUT', 'PATCH', 'DELETE']

    schema = planning_schema
    datasource = {
        'source': 'planning_autosave',
    }

    privileges = {
        'POST': 'planning_planning_management',
        'PUT': 'planning_planning_management',
        'PATCH': 'planning_planning_management',
        'DELETE': 'planning_planning_management'
    }

    mongo_indexes = {
        'planning_autosave_user': ([('lock_user', 1)], {'background': True}),
        'planning_autosave_session': ([('lock_session', 1)], {'background': True})
    }
